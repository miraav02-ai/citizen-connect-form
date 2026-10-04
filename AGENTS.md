<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Decisions

- Frontend-only prototype "Form Pengaduan Masyarakat": all wizard state lives in
  React memory on the single `/` route (`useState` in `src/routes/index.tsx`);
  no backend, database, auth, API, or integrations unless the user asks for
  them — the user explicitly scoped the build to UI/UX only.
- Design system "Bento glass civic" (chosen by user from design directions):
  Plus Jakarta Sans, indigo `--primary` (#4f46e5), frosted `glass`/`glass-in`
  utilities, soft glow backdrop. All colors flow from oklch tokens in
  `src/styles.css` — never hardcode color utilities in components.
