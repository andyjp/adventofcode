import collections
from ortools.sat.python import cp_model
import re

def solve(time, blueprint):
    model = cp_model.CpModel()
    minutes = {}
    state = collections.namedtuple('state','ore clay obsidian geode ore_robot clay_robot obsidian_robot geode_robot')
    for i in range(0,time+1):
        ore = model.NewIntVar(0, 300, 'ore' + str(i))
        clay = model.NewIntVar(0, 300, 'clay' + str(i))
        obsidian = model.NewIntVar(0, 300, 'obsidian' + str(i))
        geode = model.NewIntVar(0, 300, 'geode' + str(i))

        ore_robot = model.NewIntVar(0, 100, 'ore_robot' + str(i))
        clay_robot = model.NewIntVar(0, 100, 'clay_robot' + str(i))
        obsidian_robot = model.NewIntVar(0, 100, 'obsidian_robot' + str(i))
        geode_robot = model.NewIntVar(0, 100, 'geode_robot' + str(i))

        buy_ore_robot = model.NewIntVar(0, 1, 'buy_ore_robot' + str(i))
        buy_clay_robot = model.NewIntVar(0, 1, 'buy_clay_robot' + str(i))
        buy_obsidian_robot = model.NewIntVar(0, 1, 'buy_obsidian_robot' + str(i))
        buy_geode_robot = model.NewIntVar(0, 1, 'buy_geode_robot' + str(i))

        minutes[i] = state(ore, clay, obsidian, geode, ore_robot, clay_robot, obsidian_robot, geode_robot)

        # Initial state
        if i == 0:
            model.Add(ore == 0)
            model.Add(clay == 0)
            model.Add(obsidian == 0)
            model.Add(geode == 0)
            model.Add(ore_robot == 1)
            model.Add(clay_robot == 0)
            model.Add(obsidian_robot == 0)
            model.Add(geode_robot == 0)
        else:
            # Each robot can only collect one mineral for each interval
            model.Add(ore == minutes[i-1].ore_robot + minutes[i-1].ore
                - buy_ore_robot * blueprint["ore_robot"].ore
                - buy_clay_robot * blueprint["clay_robot"].ore
                - buy_obsidian_robot * blueprint["obsidian_robot"].ore
                - buy_geode_robot * blueprint["geode_robot"].ore)
            model.Add(clay == minutes[i-1].clay_robot + minutes[i-1].clay
                - buy_ore_robot * blueprint["ore_robot"].clay
                - buy_clay_robot * blueprint["clay_robot"].clay
                - buy_obsidian_robot * blueprint["obsidian_robot"].clay
                - buy_geode_robot * blueprint["geode_robot"].clay)
            model.Add(obsidian == minutes[i-1].obsidian_robot + minutes[i-1].obsidian
                - buy_ore_robot * blueprint["ore_robot"].obsidian
                - buy_clay_robot * blueprint["clay_robot"].obsidian
                - buy_obsidian_robot * blueprint["obsidian_robot"].obsidian
                - buy_geode_robot * blueprint["geode_robot"].obsidian)
            model.Add(geode == minutes[i-1].geode_robot + minutes[i-1].geode)
            # Can buy a robot
            model.Add(buy_ore_robot * blueprint["ore_robot"].ore <= minutes[i-1].ore)
            model.Add(buy_clay_robot * blueprint["clay_robot"].ore <= minutes[i-1].ore)
            model.Add(buy_obsidian_robot * blueprint["obsidian_robot"].ore <= minutes[i-1].ore)
            model.Add(buy_obsidian_robot * blueprint["obsidian_robot"].clay <= minutes[i-1].clay)
            model.Add(buy_geode_robot * blueprint["geode_robot"].ore <= minutes[i-1].ore)
            model.Add(buy_geode_robot * blueprint["geode_robot"].obsidian <= minutes[i-1].obsidian)
            # Limit robot buying to 1 or 0
            model.Add(buy_ore_robot + buy_clay_robot + buy_obsidian_robot + buy_geode_robot <= 1)
            # Robot can increase by 1
            model.Add(ore_robot == minutes[i-1].ore_robot + buy_ore_robot)
            model.Add(clay_robot == minutes[i-1].clay_robot + buy_clay_robot)
            model.Add(obsidian_robot == minutes[i-1].obsidian_robot + buy_obsidian_robot)
            model.Add(geode_robot == minutes[i-1].geode_robot + buy_geode_robot)

        if i == time:
            model.Maximize(geode)

    solver = cp_model.CpSolver()
    status = solver.Solve(model)
    if status == cp_model.OPTIMAL or status == cp_model.FEASIBLE:
        return solver.ObjectiveValue()
        print(solver.ResponseStats())
    else:
        print('No solution found')
        return 0

input = """Blueprint 1: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 15 clay. Each geode robot costs 3 ore and 9 obsidian.
Blueprint 2: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 12 clay. Each geode robot costs 4 ore and 19 obsidian.
Blueprint 3: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 14 clay. Each geode robot costs 3 ore and 16 obsidian.
Blueprint 4: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 17 clay. Each geode robot costs 3 ore and 19 obsidian.
Blueprint 5: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 10 clay. Each geode robot costs 2 ore and 10 obsidian.
Blueprint 6: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 16 clay. Each geode robot costs 3 ore and 9 obsidian.
Blueprint 7: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 7 clay. Each geode robot costs 3 ore and 9 obsidian.
Blueprint 8: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 19 clay. Each geode robot costs 2 ore and 12 obsidian.
Blueprint 9: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 16 clay. Each geode robot costs 3 ore and 20 obsidian.
Blueprint 10: Each ore robot costs 2 ore. Each clay robot costs 2 ore. Each obsidian robot costs 2 ore and 7 clay. Each geode robot costs 2 ore and 14 obsidian.
Blueprint 11: Each ore robot costs 2 ore. Each clay robot costs 4 ore. Each obsidian robot costs 2 ore and 16 clay. Each geode robot costs 4 ore and 12 obsidian.
Blueprint 12: Each ore robot costs 2 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 15 clay. Each geode robot costs 2 ore and 15 obsidian.
Blueprint 13: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 5 clay. Each geode robot costs 2 ore and 10 obsidian.
Blueprint 14: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 2 ore and 15 clay. Each geode robot costs 3 ore and 16 obsidian.
Blueprint 15: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 19 clay. Each geode robot costs 2 ore and 9 obsidian.
Blueprint 16: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 4 ore and 15 clay. Each geode robot costs 4 ore and 9 obsidian.
Blueprint 17: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 17 clay. Each geode robot costs 3 ore and 16 obsidian.
Blueprint 18: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 13 clay. Each geode robot costs 3 ore and 12 obsidian.
Blueprint 19: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 10 clay. Each geode robot costs 4 ore and 10 obsidian.
Blueprint 20: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 17 clay. Each geode robot costs 3 ore and 10 obsidian.
Blueprint 21: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.
Blueprint 22: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 20 clay. Each geode robot costs 3 ore and 14 obsidian.
Blueprint 23: Each ore robot costs 2 ore. Each clay robot costs 2 ore. Each obsidian robot costs 2 ore and 17 clay. Each geode robot costs 2 ore and 10 obsidian.
Blueprint 24: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 19 clay. Each geode robot costs 3 ore and 19 obsidian.
Blueprint 25: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 2 ore and 14 clay. Each geode robot costs 3 ore and 14 obsidian.
Blueprint 26: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 13 clay. Each geode robot costs 3 ore and 19 obsidian.
Blueprint 27: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 7 clay. Each geode robot costs 2 ore and 7 obsidian.
Blueprint 28: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 20 clay. Each geode robot costs 2 ore and 19 obsidian.
Blueprint 29: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 16 clay. Each geode robot costs 2 ore and 15 obsidian.
Blueprint 30: Each ore robot costs 2 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 19 clay. Each geode robot costs 2 ore and 18 obsidian."""

# input = """Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.
# Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian."""

cost = collections.namedtuple('cost','ore clay obsidian')

blueprints = []
for i in input.split("\n"):
    m = re.match('Blueprint (\d+): Each ore robot costs (\d+) ore\. Each clay robot costs (\d+) ore\. Each obsidian robot costs (\d+) ore and (\d+) clay\. Each geode robot costs (\d+) ore and (\d+) obsidian.', i)
    blueprints.append({
        "ore_robot": cost(int(m.group(2)),0,0),
        "clay_robot": cost(int(m.group(3)),0,0),
        "obsidian_robot": cost(int(m.group(4)),int(m.group(5)),0),
        "geode_robot": cost(int(m.group(6)),0,int(m.group(7)))
    })

part1 = 0
for i,b in enumerate(blueprints):
    part1 += (i+1) * solve(24, b)
print('Part 1',part1)

part2 = 1
for b in blueprints[0:3]:
    part2 *= int(solve(32, b))
print('Part 2', part2)