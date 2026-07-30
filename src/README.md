# Project source structure

```text
src/
├── api/
│   ├── ApiCalls.ts
│   ├── EndUrls.ts
│   └── Index.ts
├── assets/
│   ├── fonts/
│   └── images/
│       ├── icon1.png
│       └── icon2.png
├── components/
│   ├── common/
│   │   ├── customButtonRN/
│   │   │   ├── index.tsx
│   │   │   └── styles.ts
│   │   └── customTextRN/
│   │       ├── index.tsx
│   │       └── styles.ts
│   └── presentation/
│       ├── buttonRN/
│       │   ├── index.tsx
│       │   └── styles.ts
│       └── textRN/
│           ├── index.tsx
│           └── styles.ts
├── constants/
│   ├── Enums.ts
│   ├── Fonts.ts
│   ├── Images.ts
│   ├── ScreenNames.ts
│   ├── StorageKeys.ts
│   ├── Strings.ts
│   └── Colors.ts
├── hooks/
│   └── index.ts
├── navigation/
│   ├── AppNavigator.tsx
│   ├── AuthNavigator.tsx
│   └── TabNavigator.tsx
├── redux/
│   ├── actions/
│   │   ├── Action1.ts
│   │   └── Action2.ts
│   ├── constants/
│   │   ├── Constants1.ts
│   │   └── Constants2.ts
│   ├── reducers/
│   │   ├── Reducer1.ts
│   │   └── Reducer2.ts
│   └── store.ts
├── screens/
│   ├── homeScreen/
│   │   ├── index.tsx
│   │   └── styles.ts
│   └── aboutScreen/
│       ├── index.tsx
│       └── styles.ts
├── styles/
│   └── GlobalStyle.ts
└── utility/
    └── Index.ts
```

TypeScript extensions replace the example’s JavaScript extensions while
preserving the same folder and file responsibilities.

