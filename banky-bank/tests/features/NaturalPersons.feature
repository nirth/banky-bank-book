Feature: Edgecases in Human Lives
  Scenario: Life of Alice the Entrepreneur
    Given Alice is a Human with Birth Certificate
      | Name  | Birthdate  | Country |
      | Alice | 1984-10-10 | GB      |
    And Alice received her National Identification Number in UK, and later in Germany after she moved there
      | Name  | Birthdate  | Country | NIN            |
      | Alice | 1984-10-10 | GB      | GB19841010FAUX |
      | Alice | 1984-10-10 | DE      | DE19841010FAUX |
    And Alice founded a Limited Company AcmeCorp in Germany against her German Identification Documents
      | Name     | Founding Date | Country | Legal Person Kind | Organisation Number | Tax Identification Number |
      | AcmeCorp | 2006-10-10    | DE      | Limited Company   | DE20061010FAUX      | DEVAT20061010FAUX         |
    And Alice became director of German Limited Company as a founder
      | Company Name | Company Number | Organisation Country | Director Name | Director NIN   | Director Country |
      | AcmeCorp     | DE20061010FAUX | DE                   | Alice         | DE19841010FAUX | DE               |
    And Alice became a shareholder (sole) by default of German Limited Company
      | Company Name | Company Number | Organisation Country | Person Kind    | Person Name | Shareholder NIN | Shareholder Country | Amount |
      | AcmeCorp     | DE20061010FAUX | DE                   | Natural Person | Alice       | DE19841010FAUX  | DE                  | 100    |
    And Alice founded a branch of AcmeCorp in UK with her UK Identification Documents a year later
      | Name     | Founding Date | Country | Legal Person Kind | Organisation Number | Tax Identification Number |
      | AcmeCorp | 2007-10-10    | GB      | Limited Company   | GB20071010FAUX      | GBVAT20061010FAUX         |
    And Alice became director of UK Branch as a founder
      | Organisation Name | Organisation Number | Organisation Country | Director Name | Director NIN   | Director Country |
      | AcmeCorp          | GB20071010FAUX      | GB                   | Alice         | GB19841010FAUX | GB               |
    And Shareholders of UK Branch look like this
      | Organisation Name | Organisation Number | Organisation Country | Person Kind    | Person Name | Shareholder NIN | Shareholder Country | Amount |
      | AcmeCorp-GB       | GB20071010FAUX      | GB                   | Legal Person   | AcmeCorp    | DE20061010FAUX  | DE                  | 90     |
      | AcmeCorp-GB       | GB20071010FAUX      | GB                   | Natural Person | Alice       | GB19841010FAUX  | GB                  | 10     |
    And Alice founded Branches in US, Russia, and France against her UK and German identification
      | Name        | Founding Date | Country | Legal Person Kind | Organisation Number | Tax Identification Number |
      | AcmeCorp-US | 2008-10-10    | US      | Limited Company   | US20081010FAUX      | USTIN20081010FAUX         |
      | AcmeCorp-RU | 2008-10-10    | RU      | Limited Company   | RU20081010FAUX      | RUIIN20081010FAUX         |
      | AcmeCorp-FR | 2008-10-10    | FR      | Limited Company   | FR20081010FAUX      | FRVAT20081010FAUX         |
    And Alice became director of branches in US, Russia, and France as a founder
      | Organisation Name | Organisation Number | Company Country | Director Name | Director NIN   | Director Country |
      | AcmeCorp-US       | US20081010FAUX      | US              | Alice         | GB19841010FAUX | GB               |
      | AcmeCorp-RU       | RU20081010FAUX      | RU              | _Alisa        | DE19841010FAUX | DE               |
      | AcmeCorp-FR       | FR20081010FAUX      | FR              | Alice         | DE19841010FAUX | DE               |
    And With following shareholder structure for the branches in US, Russia, and France
      | Organisation Name | Organisation Number | Company Country | Person Kind    | Person Name | Shareholder NIN | Shareholder Country | Amount |
      | AcmeCorp-US       | US20081010FAUX      | US              | Legal Person   | AcmeCorp-GB | GB20071010FAUX  | GB                  | 90     |
      | AcmeCorp-US       | US20081010FAUX      | US              | Natural Person | Alice       | GB19841010FAUX  | GB                  | 10     |
      | AcmeCorp-RU       | RU20081010FAUX      | RU              | Legal Person   | AcmeCorp    | DE20061010FAUX  | DE                  | 90     |
      | AcmeCorp-RU       | RU20081010FAUX      | RU              | Natural Person | Alice       | DE19841010FAUX  | DE                  | 10     |
      | AcmeCorp-FR       | FR20081010FAUX      | FR              | Legal Person   | AcmeCorp    | DE20061010FAUX  | DE                  | 90     |
      | AcmeCorp-FR       | FR20081010FAUX      | FR              | Natural Person | Alice       | DE19841010FAUX  | DE                  | 10     |
    And Alice founded a Not for Profit in UK and Russia, to help children get access to crude oil
      | Name             | Founding Date | Country | Legal Person Kind | Organisation Number | Tax Identification Number |
      | FondueFoundation | 2009-10-10    | GB      | Not For Profit    | GBNGO20091010FAUX   |                           |
      | _FonduFond       | 2009-10-10    | RU      | Not For Profit    | RUNGO20091010FAUX   |                           |
    And With following shareholder structure for the non profits, after she invited some large corporations
      | Organisation Name | Organisation Number | Company Country | Person Kind    | Person Name      | Shareholder NIN   | Shareholder Country | Amount |
      | FondueFoundation  | GBNGO20091010FAUX   | GB              | Legal Person   | AcmeCorp-GB      | GB20071010FAUX    | GB                  | 25     |
      | FondueFoundation  | GBNGO20091010FAUX   | GB              | Natural Person | Alice            | GB19841010FAUX    | GB                  | 25     |
      | FondueFoundation  | GBNGO20091010FAUX   | GB              | Legal Person   | GazProm          | RU19921010FAUX    | RU                  | 25     |
      | FondueFoundation  | GBNGO20091010FAUX   | GB              | Legal Person   | AcmeCorp         | DE20061010FAUX    | DE                  | 25     |
      | _FonduFond        | RUNGO20091010FAUX   | RU              | Legal Person   | FondueFoundation | GBNGO20091010FAUX | GB                  | 20     |
      | _FonduFond        | RUNGO20091010FAUX   | RU              | Legal Person   | AcmeCorp-GB      | GB20071010FAUX    | GB                  | 20     |
      | _FonduFond        | RUNGO20091010FAUX   | RU              | Natural Person | Alice            | GB19841010FAUX    | GB                  | 20     |
      | _FonduFond        | RUNGO20091010FAUX   | RU              | Legal Person   | GazProm          | RU19921010FAUX    | RU                  | 20     |
      | _FonduFond        | RUNGO20091010FAUX   | RU              | Legal Person   | AcmeCorp         | DE20061010FAUX    | DE                  | 20     |
    When her life is played out
    Then we do something




