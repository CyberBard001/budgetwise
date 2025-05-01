# Budgeting App - Product Requirements Document (PRD)

## Project Name
**BudgetWise**

## Objective
To create a simple, accessible, and user-focused budgeting app that supports weekly, biweekly, and monthly pay frequencies. The app will help users plan for monthly bills and determine how much to set aside per paycheck, even when their income doesn’t align with bill cycles.

---

## MVP Scope

### Core Features
1. **Income Entry**
   - Amount
   - Frequency (weekly, biweekly, monthly)
   - Next payday (date)

2. **Bill Entry**
   - Bill name
   - Amount
   - Optional: due date
   - Bill type: *essential* or *flexible* (future feature placeholder)

3. **Dashboard**
   - Total income (calculated from frequency and amount)
   - Total bills
   - Suggested amount to save per paycheck
   - Remaining flexible budget
   - Visuals: pie chart (bills vs flex), bar or progress chart (income used)

4. **Income Shortfall Handling**
   - Detect if monthly income < monthly bills
   - Show deficit amount
   - Display helpful guidance: “Save what you can” message
   - Optional visual warning (e.g., red badge or alert)

5. **Data Persistence**
   - Use localStorage to store income and bills
   - Automatically load saved data on refresh

6. **Nice-to-Haves**
   - Ability to edit or delete bills/income
   - Light/Dark mode toggle
   - Export data to CSV
   - Highlight when income or bills change
   - Responsive mobile-first design

---

## Non-Goals (for MVP)
- User authentication or accounts
- Online syncing or cloud storage
- Recurring logic beyond monthly bills
- API integrations

---

## Tech Stack
- **Frontend**: React + Tailwind CSS
- **Charts**: Recharts
- **Storage**: localStorage (browser-based)
- **Deployment**: Netlify

---

## Future Expansion Ideas
- Support for flexible vs essential bills
- Links to government/charity support services
- Debt management tips and guidance
- Database of paid services and cheaper/free alternatives (e.g., ChatGPT, Spotify, YouTube)
  - Optional affiliate links
- Personalized alerts or savings reminders
- Family-friendly support like meal ideas during school breaks (e.g., summer holidays)
- Monthly overview with projected balances
- Optional login and syncing for multi-device use

---

## Target Users
- Individuals with irregular income (weekly, biweekly)
- Low-income users looking for support and structure
- Parents managing household budgets
- Users who prefer privacy and offline tools

---

## Success Criteria
- Users can add income and bills with minimal friction
- Users can see clear guidance on how much to save per paycheck
- App functions without needing internet or accounts
- Clear messaging when income is insufficient
- Simple, supportive, and non-judgmental UX

---

## Author
Stuart Gibson
