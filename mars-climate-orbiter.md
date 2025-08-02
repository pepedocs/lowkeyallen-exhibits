# title
Mars Climate Orbiter Unit Conversion

# id
mars-climate-orbiter

# what
Software used imperial units (pound-seconds) instead of metric (newton-seconds).

# impact
$125 million spacecraft burned up in Mars atmosphere.

# when
1999

# category
Mission-Critical

# language
C++

# codeSnippet
```cpp
// One team's code (Lockheed Martin)
thrust_force = calculate_thrust_lbf_sec();

// NASA's code expected:
// thrust_force in newton_seconds
// 1 lbf⋅s = 4.448 N⋅s
```

# sourceLink
https://www.jpl.nasa.gov/news/mars-climate-orbiter-failure-board-releases-report

# expertExplanation
The navigation software expected thrust values in metric newton-seconds, but Lockheed Martin's software provided values in imperial pound-force seconds. This 4.45x difference caused the orbiter to fly too close to Mars and burn up in the atmosphere. A perfect example of why interface specifications must be crystal clear.
