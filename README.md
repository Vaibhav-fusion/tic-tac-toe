# Emoji Tic Tac Toe Game

## Tech Stack
- React (with functional components and hooks)
- @react-three/fiber & @react-three/drei for 3D board rendering
- Tailwind CSS for styling


## Vanishing Feature Implementation
Each player can have at most 3 active moves on the board at any time. When a player places a fourth move, the oldest move from that player is removed ("vanishes") automatically. This is managed by tracking each player's moves in separate arrays and updating the board state accordingly by clearing the oldest square when a new move is made beyond the limit.




## Future Improvements
- Add animations thoughout evey component/
- Enhance the 3D board with better lighting, shadows, and interactivity.
- Work on user UI, color theme and UX choises.
- Add bester sound design.
- Mobile responsiveness improvements.
- Include more emoji categories and custom emoji packs.