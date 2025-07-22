Scenario: Start match simulation

- I visit the home page
- I see three matches with 0:0 score
- And I see "Start" button
- When I click start
- Then simulation start
- Then I see "Finish" button
- Then every 10 sec, random team can score 1 goal
- And Total goals increase
- After 90 sec or on "Finish" simulation ends
- Then I can see "Restart" button
- After clicking "Restart"
- Then all match scores are reset to 0:0
- And the total goals is 0
- Simulation starts again
