const initialData = [
  {
    name: "src",
    isOpen: false,
    files: [
      { name: "index.js" },
      { name: "App.js" },
      {
        name: "components",
        isOpen: false,
        files: [
          { name: "Header.js" },
          { name: "Footer.js" },
          { name: "Sidebar.js" },
          {
            name: "common",
            isOpen: false,
            files: [
              { name: "Button.js" },
              { name: "Card.js" }
            ]
          }
        ]
      },
      {
        name: "hooks",
        isOpen: false,
        files: [
          { name: "useAuth.js" },
          { name: "useFetch.js" }
        ]
      }
    ]
  },

  {
    name: "public",
    isOpen: false,
    files: [
      { name: "index.html" },
      { name: "favicon.ico" },
      {
        name: "assets",
        isOpen: false,
        files: [
          { name: "logo.png" },
          { name: "styles.css" }
        ]
      }
    ]
  },

  {
    name: "README.md"
  },

  {
    name: "package.json"
  },

  {
    name: "node_modules",
    isOpen: false,
    files: [
      { name: ".bin" },
      { name: "react" },
      { name: "react-dom" }
    ]
  }
];

export default initialData;