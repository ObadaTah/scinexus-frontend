const ASSETS = {
    footerBackground: new URL("./png/footer-background.png", import.meta.url),
    spine: new URL("./svg/spine.svg", import.meta.url),
    defaultprofilePicture: new URL(
        "./png/default_profile_picture.png",
        import.meta.url
    ),
    emojis: {
        smart: new URL("./png/emojis/smartEmoji.png", import.meta.url),
        angry: new URL("./png/emojis/angryEmoji.png", import.meta.url),
        like: new URL("./png/emojis/likeEmoji.png", import.meta.url),
        looking: new URL("./png/emojis/lookingEmoji.png", import.meta.url),
        mindBlowing: new URL(
            "./png/emojis/mindBlowingEmoji.png",
            import.meta.url
        ),
        takingNotes: new URL(
            "./png/emojis/takingNotesEmoji.png",
            import.meta.url
        ),
    },
};
export default ASSETS;
