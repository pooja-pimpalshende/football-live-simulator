Scenario: Start match simulation

- I visit the home page
- I see three matches with 0:0 score
- And I see "Start" button
- When I click start
- Then simulation start
- Then I see "Finish" button
- Then every 10 sec, random team can score 1 goal
- When the first goal is scored, I see "Total Goals" displayed and it starts increasing
- After 90 sec
- Then I can see "Restart" button
- After clicking "Restart"
- Then all match scores are reset to 0:0
- And the total goals is 0
- Simulation starts again

Scenario: End simulation before 90 seconds

- I visit the home page
- I click "Start"
- I see "Finish" button
- I click "Finish" before 90 seconds
- Then simulation ends immediately
- I see "Restart" button
- No more goals are scored after finishing
- I can see the progress bar and the total goals as they were at the moment I clicked "Finish"
