const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}"],
  darkMode: "class",
  theme: {
    boxShadow: {
      "0dp": "",
      "1dp": createShadow(false, 0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0),
      "2dp": createShadow(false, 0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0),
      "3dp": createShadow(false, 0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0),
      "4dp": createShadow(false, 0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0),
      "6dp": createShadow(false, 0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0),
      "8dp": createShadow(false, 0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1),
      "12dp": createShadow(false, 0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3),
      "16dp": createShadow(false, 0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5),
      "24dp": createShadow(false, 0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8),
      "inset-0dp": "",
      "inset-1dp": createShadow(true, 0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0),
      "inset-2dp": createShadow(true, 0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0),
      "inset-3dp": createShadow(true, 0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0),
      "inset-4dp": createShadow(true, 0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0),
      "inset-6dp": createShadow(true, 0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0),
      "inset-8dp": createShadow(true, 0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1),
      "inset-12dp": createShadow(true, 0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3),
      "inset-16dp": createShadow(true, 0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5),
      "inset-24dp": createShadow(true, 0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8),
    },
  },
  corePlugins: {
    basis: false,
  },
  plugins: [flexGapPlugin()],
};

function createShadow(inset, ...px) {
  return [
    `${px[0]}px ${px[1]}px ${px[2]}px ${px[3]}px rgba(0,0,0,0.2)`, // Umbra
    `${px[4]}px ${px[5]}px ${px[6]}px ${px[7]}px rgba(0,0,0,0.14)`, // Penumbra
    `${px[8]}px ${px[9]}px ${px[10]}px ${px[11]}px rgba(0,0,0,0.12)`, // Ambient
  ]
    .map((shadow) => (inset ? "inset " + shadow : shadow))
    .join(",");
}

function flexGapPlugin() {
  return plugin(({ matchUtilities, theme }) => {
    matchUtilities(
      {
        gap: (value) => ({
          "--gap": value,
        }),
      },
      {
        values: theme("gap"),
      }
    );
    matchUtilities(
      {
        col: (value) => {
          const [span, cols] = value.split("/");
          return {
            "flex-basis": `calc((100% * ${span} / ${cols}) - (var(--gap, 0px) * (1 - ${span} / ${cols})))`,
          };
        },
      },
      {
        values: {
          "1/2": "1/2",
          "1/3": "1/3",
          "2/3": "2/3",
          "1/4": "1/4",
          "2/4": "2/4",
          "3/4": "3/4",
          "1/5": "1/5",
          "2/5": "2/5",
          "3/5": "3/5",
          "4/5": "4/5",
          "1/6": "1/6",
          "2/6": "2/6",
          "3/6": "3/6",
          "4/6": "4/6",
          "5/6": "5/6",
          "1/8": "1/8",
          "2/8": "2/8",
          "3/8": "3/8",
          "4/8": "4/8",
          "5/8": "5/8",
          "6/8": "6/8",
          "7/8": "7/8",
          "1/12": "1/12",
          "2/12": "2/12",
          "3/12": "3/12",
          "4/12": "4/12",
          "5/12": "5/12",
          "6/12": "6/12",
          "7/12": "7/12",
          "8/12": "8/12",
          "9/12": "9/12",
          "10/12": "10/12",
          "11/12": "11/12",
        },
      }
    );
  });
}
