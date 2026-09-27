# Bold, action-first TGS interface

## Goal
Turn Baseline and Net-Low into a simpler, bolder workspace that feels editorial and industrial rather than like standard SaaS software.

## Visual direction
- Use the selected TGS Signal palette: deep green `#02403D`, electric lime `#E2FF4D`, warm cream `#FFFDF8`, and mauve `#B7829C`.
- Use Space Grotesk for headings and DM Sans for body text.
- Follow the selected neobrutalist direction with crisp borders, offset shadows, strong colour blocks, large numbers, and restrained corners.
- Keep TGS branding prominent and preserve accessible contrast.

## Changes
- Rework the Baseline sign-in, header, navigation, portfolio, metrics, actions, project cards, and forms into a bold bento layout.
- Shorten visible instructions and move supporting explanations into expandable details where appropriate.
- Make the first screen action-led: enter emissions, establish a baseline, add a project, and open the annual report.
- Apply the same visual system to Net-Low sign-in, navigation, dashboard, activity logging, reviews, reports, challenges, company, and integrations.
- Preserve all calculations, storage, permissions, exports, workflows, and existing data.
- Keep mobile navigation swipeable, controls easy to tap, and dense tables horizontally scrollable without page overflow.

## Validation
- Check Baseline sign-in and the signed-in portfolio on desktop and mobile.
- Check Net-Low sign-in, dashboard, and activity form on desktop and mobile.
- Confirm actions, tabs, forms, reports, and existing calculations still work.

## Technical details
- Update the static Baseline document in place without converting or restructuring its application logic.
- Extend the shared TGS tokens and reusable styles for the TanStack pages.
- Add route-specific metadata where missing while preserving current search and social metadata.
