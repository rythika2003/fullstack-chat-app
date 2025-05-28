// import daisyui from "daisyui";
// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   // plugins: [daisyui],
//   //  plugins:[require("daisyui")],
//   plugins: [require("daisyui")],
//   daisyui: {
//     themes: ["dark"], // or use a custom theme
//   },
// };

import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "light", "dark", "cupcake", "bumblebee", "emerald", "corporate",
       "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden",
        "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", 
        "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade",
         "night", "coffee", "winter"

    ], // applies the dark theme globally
  },
};
