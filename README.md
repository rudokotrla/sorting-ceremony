# 🎓 Sorting Ceremony

A magical Harry Potter-themed sorting ceremony application built with Next.js that randomly assigns students to Hogwarts houses (Gryffindor, Hufflepuff, Ravenclaw, and Slytherin).

## ✨ Features

- **Interactive House Selection**: Set the number of available seats for each Hogwarts house
- **Animated Sorting Ceremony**: Watch as the Sorting Hat "thinks" and announces house assignments
- **Audio Integration**: Enjoy immersive sound effects during the sorting process (voices currently in Slovak language)
- **Visual House Emblems**: Beautiful representations of each house with authentic colors
- **Real-time Seat Tracking**: Monitor remaining seats in each house during the ceremony
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Party Ready**: Perfect for Harry Potter themed parties and events

## 🏠 Hogwarts Houses

- **Gryffindor**: For the brave and bold
- **Hufflepuff**: For the loyal and kind
- **Ravenclaw**: For the wise and clever
- **Slytherin**: For the ambitious and cunning

## 🚀 Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to start the sorting ceremony!

## 🎮 How to Use

1. **Setup Phase**: Configure the number of seats available for each house
2. **Sorting Ceremony**: Click "Sort Student" to randomly assign students to houses
3. **Watch the Magic**: Enjoy the animated sorting process with sound effects
4. **Track Progress**: Monitor remaining seats as students are sorted
5. **Restart**: Begin a new ceremony at any time

## 🛠️ Tech Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **React Hooks**: Modern state management
- **Audio API**: Browser-based sound integration

## 📁 Project Structure

```
src/
├── app/                 # Next.js app directory
├── components/          # React components
│   ├── SortingCeremony.tsx  # Main sorting interface
│   ├── SeatConfig.tsx       # House seat configuration
│   └── HouseEmblem.tsx      # House visual representation
├── data/                # Static data
│   └── houses.ts           # House definitions and styling
└── types/               # TypeScript type definitions
    └── house.ts            # House and game state types
```

## 🎨 Customization

- Add custom audio files in `/public/audio/` for each house (e.g., `gryffindor.mp3`)
- Currently includes Slovak language voices for Gryffindor, Hufflepuff, and Slytherin (Ravenclaw voice missing)
- Modify house colors and styling in `/src/data/houses.ts`
- Customize animations and transitions in the component files

## 🎉 Perfect for Events

This application is ideal for:

- Harry Potter themed birthday parties
- School events and celebrations
- Fan gatherings and conventions
- Interactive entertainment at themed events

## 🤝 Contributing

Feel free to contribute to this magical project! Whether it's adding new features, improving animations, or fixing bugs, all contributions are welcome.

## 📜 Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - Learn about TypeScript
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Learn about utility-first CSS

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
