export default defineAppConfig({
  ui: {
    primary: "pacific-blue",
    colors: ["pacific-blue"],
    input: {
      //   base: "relative block w-full focus:outline-none border-0 text-white rounded-md bg-elephant-950 p-1 ring-1 focus:ring-2",
      variant: {
        settings:
          "block w-full focus:outline-none border-0 text-white rounded-md bg-elephant-950 p-2 w-[15vw] ring-1 focus:ring-2",
      },
    },

    // button: {
    //   variant: {
    //     test: "bg-elephant-500",
    //   },
    // },
    //   strategy: "override",
    // button: {
    //   color: {
    //     dark: {
    //       solid: "text-elephant-950 placeholder-gray-400",
    //     },
    //   },
    //   //   default: {
    //   //     color: "elephant",
    //   //   },
    // },
  },
});
