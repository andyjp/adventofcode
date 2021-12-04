ipt="""84
60
10
23
126
2
128
63
59
69
127
73
140
55
154
133
36
139
4
70
110
97
153
105
41
106
79
145
35
134
146
148
13
77
49
107
46
138
88
152
83
120
52
114
159
158
53
76
16
28
89
25
42
66
119
3
17
67
94
99
7
56
85
122
18
20
43
160
54
113
29
130
19
135
30
80
116
91
161
115
141
102
37
157
129
34
147
142
151
68
78
24
90
121
123
33
98
1
40"""

ipt="""16
10
15
5
1
11
7
19
6
12
4"""

# ipt="""28
# 33
# 18
# 42
# 31
# 14
# 46
# 20
# 48
# 47
# 24
# 23
# 49
# 45
# 19
# 38
# 39
# 11
# 1
# 32
# 25
# 35
# 8
# 17
# 7
# 9
# 4
# 2
# 34
# 10
# 3"""

adapters = [int(i) for i in ipt.split('\n')]
adapters.sort()
diffs = [a - adapters[idx-1] if idx > 0 else a for idx, a in enumerate(adapters)] + [3]

print(diffs)
ones_sets = []
count_ones = 0
for d in diffs:
  if d == 1:
    count_ones += 1
  if d == 3 and count_ones > 0:
    ones_sets.append(count_ones)
    count_ones = 0

convert = [1,2,4,7,13,24] # tribonacci sequence
print(ones_sets)
answer = 1
for x in [convert[o-1] for o in ones_sets ]:
  answer *= x
print(answer)

0 1

from collections import defaultdict
paths = defaultdict(int)
paths[0] = 1
for adapter in [0] + adapters:
  for diff in range(1,4):
    next_a = adapter + diff
    if next_a in adapters:
      paths[next_a] += paths[adapter]
print(paths)
# print(diffs)
# print('Part1:', len([d for d in diffs if d == 1]) * len([d for d in diffs if d == 3]) )


# 1, 3, 1, 1, 1, 3, 1, 1, 3, 1, 3, 3]
# 8 * 8 * 4 * 2 * 8 * 8
# [1, 1, 1, 1, 3, 1, 1, 1, 1, 3, 3, 1, 1, 1, 3, 1, 1, 3, 3, 1, 1, 1, 1, 3, 1, 3, 3, 1, 1, 1, 1, 3]
# 4, 4, 3, 2, 4, 4


# 1
# 2
# 4
# 8
1, 2, 4, 7, 13, 24
# 11 = 2 = 2^1 - 0 = 1 * 2
# 111 = 4 = 2^2 - 0 = 
# 1111 = 7 = 2^3 - 1 = 
# 11111 = 13 = 2^4 - 3 = 
# 111111 = 24 = 2^5 - 8

# 0 1 4 5 6 7 10

# 0 1 4 5 6 7 8 (1,3,1,1,1,1)

# 0 1 4 5

# 0 1 4 6
# 0 1 4 5 6


# 0 1 4 7
# 0 1 4 6 7
# 0 1 4 5 7
# 0 1 4 5 6 7

# 0 1 4 5 8
# 0 1 4 5 6 8
# 0 1 4 5 6 7 8
# 0 1 4 5 7 8
# 0 1 4 6 7 8
# 0 1 4 6 8
# 0 1 4 7 8

# 0 1 4 5 8 9
# 0 1 4 5 6 9
# 0 1 4 5 6 8 9 
# 0 1 4 5 6 7 9
# 0 1 4 5 6 7 8 9
# 0 1 4 5 7 9
# 0 1 4 5 7 8 9
# 0 1 4 6 7 9
# 0 1 4 6 7 8 9
# 0 1 4 6 9
# 0 1 4 6 8 9
# 0 1 4 7 9
# 0 1 4 7 8 9

# 0 1 4 5 8 10
# 0 1 4 5 8 9 10
# 0 1 4 5 6 9 10
# 0 1 4 5 6 8 10
# 0 1 4 5 6 8 9 10
# 0 1 4 5 6 7 10
# 0 1 4 5 6 7 9 10
# 0 1 4 5 6 7 8 10
# 0 1 4 5 6 7 8 9 10
# 0 1 4 5 7 10
# 0 1 4 5 7 9 10
# 0 1 4 5 7 8 10
# 0 1 4 5 7 8 9 10
# 0 1 4 6 7 10
# 0 1 4 6 7 9 10
# 0 1 4 6 7 8 10
# 0 1 4 6 7 8 9 10
# 0 1 4 6 9 10
# 0 1 4 6 8 10
# 0 1 4 6 8 9 10
# 0 1 4 7 10
# 0 1 4 7 9 10
# 0 1 4 7 8 10
# 0 1 4 7 8 9 10


# 3 1's add 4'

# 131111
# 0 1 4 5 6 7 8 

# 0 1 4 6
# 0 1 4 7
# 0 1 4 6 7
# 0 1 4 5 6 7

# 0 1 4 6 8
# 0 1 4 6 7 8
# 0 1 4 5 6 7 8

# 4 5,6,7
# 5
# 56
# 567
# 57
# 46

# 10 11,12
# 10, 11
# 10, 12

# 15 16,17
# 15, 16
# 15, 17

# count = 1
# 0 1

# count = 2
# 0 2
# 0 1 2

# count = 4
# 0 3
# 0 2 3
# 0 1 3
# 0 1 2 3

# count = 6
# 0 3 4
# 0 2 4
# 0 2 3 4
# 0 1 4
# 0 1 3 4
# 0 1 2 3 4

# count = 10
# 0 3 4
# 0 2 5
# 0 2 4 5
# 0 2 3 5
# 0 2 3 4 5
# 0 1 4 5
# 0 1 3 5
# 0 1 3 4 5
# 0 1 2 3 5

# 0 1 2 3 4 5

# count = 0
# distinct = [[]]
# for a in [0] + adapters:
#   add_d = []
#   for d in distinct:
#     # if len(d) > 1 and (a - d[-1] == 2 or a - d[-1] == 3):
#       # add_d.append(d[:-1] + [a])
#     if len(d) > 1 and (a - d[-2] == 2 or a - d[-2] == 3):
#       # print(d[-2], a, a - d[-2])
#       add_d.append(d[:-1] + [a])
#     d.append(a)
#   distinct += add_d
#   # print(distinct)
# print(len(distinct))

  
  


# distinct = [[0]]
# # print([0] + adapters)
# for idx, a in enumerate([0] + adapters):
#   # for d in distinct:
#   #   d.append(a)
#   within_3 = [i for i in adapters[idx:idx+3] if i <= a + 3]
#   print(a, '---', within_3)
#   new_d = []
#   for d in distinct:
#     for w in within_3:
#       if d[-1] < w:
#         new_d.append(d + [w])
#       if d[-1] == w and d not in new_d:
#         new_d.append(d)
#   distinct = new_d
#   print(distinct)
#   print(len(distinct))
#   if idx > 10:
#     break

# distinct = [[0]]
# for idx, a in enumerate(adapters):
#   within_3 = [i for i in adapters[idx:idx+3] if i < a + 3]
#   print(a, '----', within_3)
#   if len(within_3) > 1:
#     # print(a, within_3)
#     new_distinct=[]
#     for d in distinct:
#       for w in within_3:
#         if d[-1] == w and d not in new_distinct:
#           new_distinct.append(d)
#         if d[-1] != w and d[-1] < w:
#           new_d = d + [w]
#           if new_d not in new_distinct:
#             new_distinct.append(new_d)
#         # new_distinct.append(d + [w])
#     distinct = new_distinct
#     # distinct = new_distinct + distinct
#     # print(distinct)
#   if len(within_3) == 1:
#     for d in distinct:
#       if d[-1] != within_3[0] and d[-1] < within_3[0]:
#         d.append(within_3[0])
#   # print(a, within_3)
#   # if idx > 10:
#   #   break
#   print(distinct)
# new_ones = []
# for d in distinct:
#   if d not in new_ones:
#     new_ones.append(d)
# print(len(distinct))
# print(len(new_ones))
# print(new_ones)


# adapters.reverse()
# print(adapters)
# idx = 1
# stuff=[]
# # adapters= [0] + adapters
# # while idx < len(adapters) - 1:
# #   within_3 = len([a for a in adapters[idx+1:idx+4] if a <= adapters[idx]+3])
# #   print(idx, adapters[idx:idx+3], within_3)
# #   if within_3 > 1:
# #     stuff.append(within_3)
# #   idx += within_3

# # stuff.reverse()
# # print(stuff)
# # accum=0
# # for s in stuff:
# #   accum=accum**s if accum > 0 else s
# # print(accum)

# idx = 0
# all_paths=[]
# print(adapters[0:3], adapters[:3])
# while idx < len(adapters) - 1:
#   # print(idx)
#   # print(adapters[idx+1:idx+4])
#   options = [a for a in adapters[idx+1:idx+4] if a >= adapters[idx]-3]
#   print(adapters[idx], '----', options)
#   # for i,o in enumerate(options):
#   #   if i == 0:
#   #     for p in all_paths:
#   #       p.append(o)
#   #   else:
#   #     new_all_paths = []
#   #     for p in all_paths:
#   #       new_all_paths.append(p + [o])
#   #     # for n in new_all_paths:
#   #     #   if n not in all_paths:
#   #     all_paths+=new_all_paths
#   #   print(all_paths)

#   if len(options) == 1:
#     if len(all_paths) == 0:
#       all_paths.append([options[0]])
#     else:
#       for p in all_paths:
#         if p[-1] != options[0]:
#           p.append(options[0])
#   else:
#     new_all_paths = []
#     for o in options:
#       for p in all_paths:
#         if p[-1] != o:
#           new_all_paths.append(p + [o])
#     # for n in new_all_paths:
#     #   if n not in all_paths:
#     #     all_paths.append(n)
#     all_paths=new_all_paths
#   print(all_paths)
#   idx += 1



#   # if len(paths) > 1:
#   #   # lists.append(paths[0])
#   #   for p in paths:
#   #     # lists.append(p)
#   # idx += 1
#   # exit()

# print(all_paths)
# print(len(all_paths))






