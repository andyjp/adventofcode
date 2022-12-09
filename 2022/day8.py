import numpy as np

testInput = """30373
25512
65332
33549
35390"""

# grid=np.array(testInput.split("\n"))

grid = []
for i in testInput.split("\n"):
    grid.append(list(i))
grid=np.array(grid)
print(grid)
print(grid[1:-1,1:-1])

not_visible=0
for rn, row in enumerate(grid):
    for cn, i in enumerate(row):
        if (rn > 0 and cn >0 and rn < grid.shape[0] - 1 and cn < grid.shape[1] - 1):
            right_max=max(grid[rn,cn+1:])
            left_max=max(grid[rn,:cn])
            up_max=max(grid[:rn,cn])
            down_max=max(grid[rn+1:,cn])

            if min([right_max, left_max, up_max, down_max]) >= i:
                not_visible +=1
print('Part 1:', grid.size-not_visible)
