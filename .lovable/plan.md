## Goal

Make the chat composer in `UntitledPath.tsx` interactive. When the user sends a message manually:
1. Left "RSA Canvas" title updates to reflect their aspiration.
2. Right side shows the user's message, then a "thinking" indicator (as in PDF 1.3).
3. After ~1.5s, the assistant reply appears with the Class 8–9 foundation content (as in PDF 1.4).

## Changes (all in `src/components/home/UntitledPath.tsx`)

### 1. Title auto-rename on first send
- On first user send, parse the message for a career keyword. Simple rule: if it matches `/tell me (more )?about (a |an |the )?(.+)/i`, take the captured phrase; otherwise use the raw message.
- Rewrite `title` to `Your path to become an {Career}` (title-cased). Also show subtitle line `ICSE → PCM → JEE → B.E. Electronics` below the title when a path exists (matches PDF).
- Keep click-to-edit behavior on the title.

### 2. Conversation state
- Add `messages: Array<{ role: "user" | "assistant"; content: ReactNode; time?: string }>`.
- Add `isThinking: boolean`.
- Replace the intro block + career cards with a scrollable chat transcript once the first message is sent. Before that, keep the current intro + 3 cards (initial state unchanged).
- User bubble: right-aligned, "MM" avatar circle + "JUST NOW" timestamp, matching PDF 1.3/1.4 styling (dark bg, white text, Outfit).
- Thinking indicator: small RSA bot icon + three animated dots ("RSA Engine is thinking...").
- Assistant bubble: RSA bot icon on left, content block with heading "For Class 8–9 foundation, focus on three pillars:" followed by three bold-labeled sections (Mathematics, Physics, Hobby Electronics) with the exact copy from PDF 1.4, plus two suggestion chips: "Share ICSE Practical Tips" and "Foundational YouTube Courses".

### 3. Composer wiring
- Enter key or Send button click submits the trimmed message.
- On submit: append user message → set `isThinking = true` → after 1500ms, append the hard-coded assistant reply and clear thinking.
- Clear input after send. Disable Send while thinking.
- Also rename title on the first submit only.

### 4. Left panel
- When a path exists, show subtitle `ICSE → PCM → JEE → B.E. Electronics` under the title (Outfit light 13, `#9090B0`).
- Keep progress bar, empty state, and layout otherwise unchanged.

## Out of scope
- No real AI call — canned reply per user request.
- No routing changes, no new files.
