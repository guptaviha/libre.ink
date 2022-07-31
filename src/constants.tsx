import React from 'react';
export const APP_TITLE = 'libre.ink';
export const STARTING_TEXT = `Welcome to **Libre.ink** - Instant anonymous blogging.

No sign-up. No tracking. No kidding.

Leave your username at the door and edit this post to give it a whirl.
`;

// ## Our novel approach
// We don't care about your data. So **we don't store anything**.
// We achieve **total privacy** by storing your blog post right *in the URL*.

// While this makes the URL a little bit ungainly, we think it has some serious advantages for those looking for total privacy.

export const PLACEHOLDER_TEXT = `Instant anonymous blogging.

Write. Publish. Take it and go.`;

export const INVALID_POST_TEXT = `## Invalid Post
Something doesn't look right with the link. Please check with the author to give you a valid libre.ink link.`;

export const BUY_ME_A_BOBA_LINK = 'https://www.buymeacoffee.com/vihagupta99';
export const GITHUB_LINK = 'https://github.com/guptaviha/libre.ink';
export const FB_SHARE_LINK = 'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Flibre.ink%2F&amp;src=sdkpreparse';
export const TWITTER_SHARE_LINK = 'https://twitter.com/intent/tweet?text=Check%20this%20out!%20Minimalistic%20and%20quick%20blogging%20is%20here:%20libre.ink';
export const TINY_URL_LINK = 'https://tinyurl.com/';

export const APP_TITLE_TOOLTIP = 'Your favorite anonymous publishing platform';
export const MUTE_BTN_ON_TOOLTIP = 'Sound Off';
export const MUTE_BTN_OFF_TOOLTIP = 'Sound On';
export const SHARE_BTN_TOOLTIP = 'Share';
export const FONT_BTN_TOOLTIP = 'Font';
export const DARK_MODE_BTN_ON_TOOLTIP = 'Lights Off';
export const DARK_MODE_BTN_OFF_TOOLTIP = 'Lights On';
export const INFO_BTN_TOOLTIP = 'Info';
export const CLIPBOARD_TOOLTIP = 'Copy to Clipboard';
export const TINY_URL_TOOLTIP = 'URL Shortening with TinyURL';
export const EMAIL_TOOLTIP = 'Open Mail Client';

export const CLIPBOARD_TOAST_TEXT = 'URL copied to clipboard.';

export const BOBA_HEADER_TEXT = 'Help keep the lights on';
export const BOBA_BODY_TEXT = 'If you like what you see, consider supporting us.\n';
export const BOBA_BTN_TEXT = 'Buy us a Boba';
export const GITHUB_STAR_BTN_TEXT = 'Star us on GitHub';

export const INFO_MODAL_HEADER_TEXT = 'What is libre.ink?';
export const INFO_MODAL_BODY_TEXT = (<div>Libre.ink is a truly anonymous instant-publish blog platform that has a unique quirk. We store your blog post right in the URL.
    <br /><br />
    <h3 style={{ fontWeight: 'bold' }}>In the URL?</h3>
    That's right. We encode your entire blog post and store it in the URL. This provides true anonymity. Remember to bookmark/share your blog URL because we don't store it anywhere. In fact, we have no tracking, no database and no server of any kind.
    <br /><br />
    <h3 style={{ fontWeight: 'bold' }}>Why is my post's URL so long?</h3>
    Since everything is stored in the URL, the generated URL can get fairly long depending on the size of your post, but you can always use a URL-shortener you trust to make it shareable.
    URLs also have size limits so the app won't work above a certain post size (Something like 20,000 characters).
    <br /><br />
    <h3 style={{ fontWeight: 'bold' }}>Markdown and shortcuts</h3>
    We support Markdown and some common editing shortcuts for things like <b>Bold</b> and <i>Italics</i>.
    {/* <br /><br /> */}
    {/* <h3 style={{ fontWeight: 'bold' }}>Disclaimer</h3> */}
    {/* Due to the technical implementation of not storing any user information, we do not bear the responsibility for any misuse of this tool. */}
</div>);

export const TAG1_TEXT = 'open-source';
export const TAG2_TEXT = 'serverless';
export const TAG3_TEXT = 'markdown-supported';

export const FONT_HEADER_TEXT = 'Font Settings';
export const FONT_SIZE_LABEL_TEXT = 'Text Size';
export const FONT_OPTIONS_LABEL_TEXT = 'Font';
export const MD_TOOLBAR_LABEL_TEXT = 'Show Markdown Toolbar';

export const SHARE_HEADER_TEXT = 'Share URL';
export const SHARE_FOOTER_TEXT = 'Generated URLs can be quite long. If you like, you can use a 3rd party URL-shortening service.';


export const PUBLISH_BTN_TEXT = 'Publish';


const guideText = `# Quick guide to using libre.ink

Hello internet! 
Use this tool to write your heart out - we support markdown too!

### Use any number (1-6) of hashtags to specify your title size

**You can use bold like this**

*Or italics like this*

[Here you can add a link](https://www.markdownguide.org/cheat-sheet/)

> You can add a blockquote like this

1. Making a list is easy
2. Use numbers for an ordered list
- or hyphens for an unordered list

What to add lines to segment your post? Use three hyphens like this:

---

\`You can even add code segments inside of backticks\``;