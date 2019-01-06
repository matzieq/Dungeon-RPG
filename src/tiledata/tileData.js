let tileData = 
{

tiles: 
[
    {
        type: "FLOOR",
        url: "",
        loaded: false,
        passable: true,
        handle: null
    },
    {
        type: "WALL",
        url: "./img/tiles/tile_wall.png",
        loaded: false,
        passable: false,
        handle: null
    }
],

characters: 
[
    {
        type: "NONE",
        url: "",
        loaded: false,
        handle: null
    },
    {
        type: "HERO",
        url: "./img//characters/hero.png",
        loaded: false,
        handle: null
    },
    {
        type: "BAT",
        url: "./img//characters/bat.png",
        loaded: false,
        handle: null
    },
    {
        type: "SKELETON",
        url: "./img//characters/skeleton.png",
        loaded: false,
        handle: null
    },
],

UI: 
[
    {
        type: "bottom",
        url: "./img/UI/rectBot.png",
        loaded: false,
        handle: null
    },
    {
        type: "left",
        url: "./img/UI/rectLeft.png",
        loaded: false,
        handle: null
    },
    {
        type: "right",
        url: "./img/UI/rectRight.png",
        loaded: false,
        handle: null
    },
    {
        type: "top",
        url: "./img/UI/rectTop.png",
        loaded: false,
        handle: null
    },
    {
        type: "bottom-left",
        url: "./img/UI/rectBotLeft.png",
        loaded: false,
        handle: null
    },
    {
        type: "bottom-right",
        url: "./img/UI/rectBotRight.png",
        loaded: false,
        handle: null
    },
    {
        type: "top-left",
        url: "./img/UI/rectTopLeft.png",
        loaded: false,
        handle: null
    },
    {
        type: "top-right",
        url: "./img/UI/rectTopRight.png",
        loaded: false,
        handle: null
    }
]
}

export default tileData;