---
trigger: manual
---

## 🧠 Workspace Rule: Persistent Planning Across Sessions

Windsurf clears memory and plans with each new chat. To maintain continuity across sessions, follow this rule:

- In addition to creating `plan.md` for the current session's scope and tasks,  
  **also create or append to a file named `complete-plan.md`.**

### `complete-plan.md` Rules:
1. If `complete-plan.md` does not exist, create it and add the current plan.
2. If it **does exist**, append the current plan under a dated or timestamped section header.
3. Format each section as:

   ```markdown
   ## Plan – YYYY-MM-DD HH:MM
   [paste full contents of plan.md here]
