Feature: Running Straightforward Naratives

  Scenario: Simple world where Bob is getting his salary
    Given following actors are present:
      | Entity Type | Name               | Directors |
      | Person      | Alice              |           |
      | Person      | Bob                |           |
      | Company     | AncillaryGroceries | Alice     |
    And following banks are present:
      | Bank Name | BIC      |
      | AcmeBank  | AC22BANK |
      | BankyBank | BB33BANK |
    And following cash bank accounts are present:
      | Entity Type | BIC      | Customer Name      | Cash Account Number | Currency | Initial Balance |
      | Person      | AC22BANK | Alice              | A0001               | GBP      | 0.00            |
      | Person      | AC22BANK | Bob                | A0002               | GBP      | 0.00            |
      | Company     | BB33BANK | AncillaryGroceries | B0001               | GBP      | 150,000.00      |
    When following payments are executed:
      | Sender BIC | Receiver BIC | Ordering Cash Account Number | Beneficiary Cash Account Number | Currency | Amount  | Timetravel |
      | BB33BANK   | AC22BANK     | B0001                        | A0002                           | GBP      | 3000.00 | NextMonth  |
      | BB33BANK   | AC22BANK     | B0001                        | A0002                           | GBP      | 3000.00 | NextMonth  |
      | BB33BANK   | AC22BANK     | B0001                        | A0002                           | GBP      | 3000.00 | NextMonth  |
      | BB33BANK   | AC22BANK     | B0001                        | A0002                           | GBP      | 3000.00 | NextMonth  |
      | BB33BANK   | AC22BANK     | B0001                        | A0002                           | GBP      | 3000.00 | NextMonth  |
      | BB33BANK   | AC22BANK     | B0001                        | A0002                           | GBP      | 3000.00 | NextMonth  |
      | BB33BANK   | AC22BANK     | B0001                        | A0002                           | GBP      | 3000.00 | NextMonth  |
      | BB33BANK   | AC22BANK     | B0001                        | A0002                           | GBP      | 3000.00 | NextMonth  |
      | BB33BANK   | AC22BANK     | B0001                        | A0002                           | GBP      | 3000.00 | NextMonth  |
      | BB33BANK   | AC22BANK     | B0001                        | A0002                           | GBP      | 3000.00 | NextMonth  |
      | BB33BANK   | AC22BANK     | B0001                        | A0002                           | GBP      | 3000.00 | NextMonth  |
      | BB33BANK   | AC22BANK     | B0001                        | A0002                           | GBP      | 3000.00 | NextMonth  |
    Then we expect following balances:
      | BIC      | Cash Account Number | Balance |
      | BB33BANK | B0001               | 114,000 |
      | AC22BANK | A0002               | 36,000  |


