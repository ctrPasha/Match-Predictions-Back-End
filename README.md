This project is currently under development and not yet finished

Currently, focusing on the prediction engine/module to further increase the accuracy of score line predictions. 

## Project Structure

```txt
controllers/     Request/data handling logic for teams, matches, and counters
db/              Database connection setup
interfaces/      TypeScript interfaces for models, football data, config, and predictions
migrations/      Database schema migrations
models/          Sequelize models for stored football data
prediction/      Match prediction math and probability logic
routes/          Express route definitions
scripts/         Utility scripts for migrations, teams, matches, and crest downloads
services/        Shared service logic for database, API requests, data conversion, and predictions
test/            Unit/integration test setup and test folders
app.ts           Main Express server entry point
```

## Prediction Math 1(xG)
```txt
homeExpectedGoals = homeAttackStrength * awayDefenseStrength * leagueAverageHomeGoals
awayExpectedGoals = awayAttackStrength * homeDefenseStrength * leagueAverageAwayGoals
```

## Prediction Math 2(Attack/Defense Strength)
```txt
attackStrength = teamAverageGoalsScored / leagueAverageGoalsScored
defenseStrength = teamAverageGoalsConceded / leagueAverageGoalsConceded
```

## Prediction Math 3(Poisson Distribution)
After calculating expected goals, the backend uses a Poisson probability function to estimate the probability of each possible scoreline.
```math
$$
P(X = x) = \frac{\lambda^x e^{-\lambda}}{x!}
$$
```
Where:
- $P(X = x)$ = probability of scoring exactly `x` goals  
- $\lambda$ = expected number of goals for the team (derived from attack/defense strength and league averages)  
- $x$ = number of goals (0, 1, 2, 3, ...)  
- $e$ = Euler’s number (~2.718), a constant used in exponential decay  
- $x!$ = factorial of `x` (e.g., $3! = 3 \times 2 \times 1$)  

This formula is used to calculate the likelihood of different goal counts, which are then combined into a scoreline probability matrix.

## Prediction Math 4(Probability Matrix Cole-Dixon)

The probability of a specific scoreline (home goals = $i$, away goals = $j$) is calculated by combining two Poisson distributions:

$$
P(i, j) = P_{\text{home}}(i) \times P_{\text{away}}(j)
$$

Where:

- $P_{\text{home}}(i)$ = probability of the home team scoring $i$ goals  
- $P_{\text{away}}(j)$ = probability of the away team scoring $j$ goals  

Each probability is calculated using the Poisson formula with its own expected goals value:

- $\lambda_{\text{home}}$ for the home team  
- $\lambda_{\text{away}}$ for the away team  

This produces a matrix of probabilities for all score combinations (e.g., 0–0 up to 10–10).

## Most Probable Scoreline

The probability of a scoreline is calculated as:

$$
P(i,j) = \tau(i,j) \cdot P_{\text{home}}(i) \cdot P_{\text{away}}(j)
$$

Where:

- $P(i,j)$ = probability of the scoreline where the home team scores $i$ goals and the away team scores $j$ goals
- $\tau(i,j)$ = Dixon-Coles style adjustment for low-scoring results
- $P_{\text{home}}(i)$ = probability of the home team scoring $i$ goals
- $P_{\text{away}}(j)$ = probability of the away team scoring $j$ goals

The predicted scoreline is the score pair with the highest probability:

$$
(\hat{i}, \hat{j}) = \arg\max_{i,j} P(i,j)
$$

Where:

- $\hat{i}$ = predicted number of goals for the home team
- $\hat{j}$ = predicted number of goals for the away team
- $\arg\max$ = selects the scoreline with the highest probability

The model evaluates possible scorelines ranging from 0–0 up to 10–10 and returns the most likely result with its probability.

## Extra Information
- $\rho$ = correlation parameter controlling the strength of the adjustment(from what I researched -0.13 seems to be the most consistant one, but I will calculate this in the future my self)


