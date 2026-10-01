---
"@urbanflow/registry": minor
---

Menus, dialogs and feedback from the Flow Components page:

- **Action List** (`action-list`): static `ActionList` / `ActionSection` / `ActionItem` (`icon`, `help`, `trailing`, `destructive`, `selected`, `disabled`) and a ready-made `DropdownMenu` (`DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuLabel`, `DropdownMenuItem`, `DropdownMenuSeparator`) with the same look.
- **Modal** (`modal`): `Modal` / `ModalTrigger` / `ModalContent` (`title`, `footer`, `size` default 620px or small 360px) / `ModalClose`; plus `Dimmer`.
- **Toast** (`toast`): wrap the app in `ToastProvider` and add one `ToastViewport`; `Toast` takes `tone` default / critical, `action` + `onAction`, `dismissible`. Auto-dismisses after 4s.
- **Banner** (`banner`): `tone` info / success / warning / critical, `title`, `actions`, `onDismiss`; `inCard` for the tinted version inside cards and panels.
