import numpy as np
from scipy.optimize import fsolve
import matplotlib.pyplot as plt

x = np.array(range(-20, 20))
parab = x**2
plt.plot(x, parab)
plt.ylim(0,40)
plt.xlim(-10,10)

def f(x,a,b,d):
    x0 = np.sqrt((a-x)**2+(b-x**2)**2)-d
    return x0

d = np.zeros(10)
for i in range(len(d)):
    d[i] = np.random.randint(0,5)

a, b = 0, 0
guess = 1

for i in range(1,10,1):
    sol = fsolve(f, guess, args=(a, b, d[i]+d[i-1]))
    a, b = sol, sol**2
    circle = plt.Circle((a, b),d[i], fill=False)
    plt.gcf().gca().add_artist(circle)
    guess += 1

plt.show()



