Feature: Seach in Baidu
Seach a keyword in Baidu

  Scenario: Seach in homepage
    Given User is in homepage
    When User type keyword
    Then Each returned item title includes keyword