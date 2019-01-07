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
        url: require('../../img/tiles/tile_wall.png'),
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
        url: require('../../img/characters/hero.png'),
        loaded: false,
        handle: null
    },
    {
        type: "BAT",
        url: require("../../img//characters/bat.png"),
        loaded: false,
        handle: null
    },
    {
        type: "SKELETON",
        url: require("../../img//characters/skeleton.png"),
        loaded: false,
        handle: null
    },
],

UI: 
[
    {
        type: "bottom",
        url: require("../../img/UI/rectBot.png"),
        loaded: false,
        handle: null
    },
    {
        type: "left",
        url: require("../../img/UI/rectLeft.png"),
        loaded: false,
        handle: null
    },
    {
        type: "right",
        url: require("../../img/UI/rectRight.png"),
        loaded: false,
        handle: null
    },
    {
        type: "top",
        url: require("../../img/UI/rectTop.png"),
        loaded: false,
        handle: null
    },
    {
        type: "bottom-left",
        url: require("../../img/UI/rectBotLeft.png"),
        loaded: false,
        handle: null
    },
    {
        type: "bottom-right",
        url: require("../../img/UI/rectBotRight.png"),
        loaded: false,
        handle: null
    },
    {
        type: "top-left",
        url: require("../../img/UI/rectTopLeft.png"),
        loaded: false,
        handle: null
    },
    {
        type: "top-right",
        url: require("../../img/UI/rectTopRight.png"),
        loaded: false,
        handle: null
    }
]
}

export default tileData;