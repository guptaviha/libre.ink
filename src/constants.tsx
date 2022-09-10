import React from 'react';
export const APP_TITLE = `libre.ink`;

// No sign-up. No tracking. No kidding.
// Leave your username at the door and edit this post to give it a whirl.
// ## Our novel approach
// We don't care about your data. So **we don't store anything**.
// We achieve **total privacy** by storing your blog post right *in the URL*.
// While this makes the URL a little bit ungainly, we think it has some serious advantages for those looking for total privacy.

export const PLACEHOLDER_TEXT = `Instant anonymous blogging.

Write. Publish. Take it and go.`;

export const INVALID_POST_TEXT = `## Invalid Post
Something doesn't look right with the link. Please check with the author to give you a valid libre.ink link.`;

export const BUY_ME_A_BOBA_LINK = `https://www.buymeacoffee.com/vihagupta99`;
export const GITHUB_LINK = `https://github.com/guptaviha/libre.ink`;
export const FB_SHARE_LINK = `https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Flibre.ink%2F&amp;src=sdkpreparse`;
export const TWITTER_SHARE_LINK = `https://twitter.com/intent/tweet?text=Check%20this%20out!%20Minimalistic%20and%20quick%20blogging%20is%20here:%20libre.ink`;
export const TINY_URL_LINK = `https://tinyurl.com/`;

export const APP_TITLE_TOOLTIP = `Your favorite anonymous publishing platform`;
export const MUTE_BTN_ON_TOOLTIP = `Sound Off`;
export const MUTE_BTN_OFF_TOOLTIP = `Sound On`;
export const SHARE_BTN_TOOLTIP = `Share`;
export const FONT_BTN_TOOLTIP = `Font`;
export const DARK_MODE_BTN_ON_TOOLTIP = `Lights Off`;
export const DARK_MODE_BTN_OFF_TOOLTIP = `Lights On`;
export const INFO_BTN_TOOLTIP = `Info`;
export const CLIPBOARD_TOOLTIP = `Copy to Clipboard`;
export const TINY_URL_TOOLTIP = `URL Shortening with TinyURL`;
export const EMAIL_TOOLTIP = `Open Mail Client`;

export const CLIPBOARD_TOAST_TEXT = `URL copied to clipboard.`;
export const TINY_URL_TOAST_TEXT = `URL copied to clipboard, redirecting to tinyurl.com ...`;

export const BOBA_HEADER_TEXT = `Help keep the lights on`;
export const BOBA_BODY_TEXT = `If you like what you see, consider supporting us.\n`;
export const BOBA_BTN_TEXT = `Buy us a Boba`;
export const GITHUB_STAR_BTN_TEXT = `Star us on GitHub`;

export const INFO_MODAL_HEADER_TEXT = `What is libre.ink?`;
export const INFO_MODAL_BODY_TEXT = (<div>
    Libre.ink is a truly anonymous instant-publish blog platform that has a unique quirk. We store your blog post right in the URL.
    <br /><br/>
    Check out our sample blog
        <a href='https://www.libre.ink/?post=N4IgDg9gzgLgwhAdjApskAuEBiABABQE8YALJXAOQlSgB1F6BaZ++7d3AGQEtEBrFABMu3WK0S9uMDLgAG8wQFcAtssK4AvCNhVBKABQBKebPEAbCBDAyTAdxLczKXCRQBDQSfGJqKGYqhnJVV1Hz1cGAgXNwBjPlwhAHNnGLdAqAA6XADnN1woC1sAelwAMzSYXEheVAAncWZGcXY8ABFuGJhxSWk5BQ7KrWAAXy8GRA9BG37OgG0ADwBdTVxCE1xAUHJcH0qTQQGMtzAwNEEjdcAZcnFalGUIADc-Ptl9zozIMH0BQmN5XAhas9XjB3lYpLdzn9IrgbndHrgzBVcODlOI9E5ULg3GYzNMXgcYk43LVIaZxtizLh7tjFCgoHjgRlqWZaVBSeIYlZCHjEChbCtGZywIRSZtttRnrz+VpgZdcPo8jdShEogDuIleNjkVBcDEbm5UIJDBzXHFkcrvsjELhgXjuBaUOpeDaDt82b8yfQnIhEqQ8d79MCPeYUDA6mUbgBHWmIGLcOkYcQmUoA3CW52wWoYMb0AAF+dzewGs2+yxlB2SMC+joANLgAAyGXAAalwAEYc4gWrgAPK1PQ3QTtTpJ+SlWoQZS6iA4lCdbhIHXcZSQWqVPsDoTDmCdnp4iDCLQblCD7fs8ZoFR4lOA7515m0q3-QQZFHuzuwh5PEwH0GfADkMT-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'>
             <b> <u>here</u></b>
        </a>
    </div>);

export const INFO_MODAL_FAQ_HEAD1 = `In the URL?`;
export const INFO_MODAL_FAQ_BODY1 = `That's right. We encode your entire blog post and store it in the URL. This provides true anonymity. Remember to bookmark/share your blog URL because we don't store it anywhere. In fact, we have no tracking and no database of any kind.`;
export const INFO_MODAL_FAQ_HEAD2 = `Why is my post's URL so long?`;
export const INFO_MODAL_FAQ_BODY2 = (<div>
    Since everything is stored in the URL, the generated URL can get fairly long depending on the size of your post, but you can always use a URL-shortener you trust to make it shareable.
    <br /><br />
    URLs also have size limits so the app won't work above a certain post size (Something like 20,000 characters).
    </div>);

export const INFO_MODAL_FAQ_HEAD3 = `Formatting with Markdown`;
export const INFO_MODAL_FAQ_BODY3 = (<div>
    We support Markdown. Here's a quick guide.
    <br /><br />
    <b>Heading</b> sizes range in hashes from 1 to 6 (#, ##, ..., ######)
    <br />
    **You can use <b>bold</b> like this** 
    <br />
    *Or <b>italics</b> like this*
    <br />
    ~~And <b>strikethrough</b> like this~~
    <br /><br />
    [Here you can add a <b>link</b>](www.markdownguide.org/cheat-sheet/)
    <br />
    [Or an <b>image</b>](www.google.com/some-image.jpeg)
    <br /><br />
    1. Making a <b>list</b> is easy
    <br />
    2. Use numbers for an <b>ordered list</b>
    <br />
    - or hyphens for an <b>unordered list</b>
    <br /><br />
    What to add <b>line segments</b>? Use three hyphens like this:
    <br />
    ---
    <br /><br />
    > You can add a <b>blockquote</b> like this
    <br />
    `Or even add <b>code segments</b> inside of backticks`
    <br />
    </div>);

export const INFO_MODAL_DISCL_TEXT = (<div><i><b>Disclaimer</b>: Due to the technical implications of our strict no-storage policy, we do not bear the responsibility for any misuse of this tool.</i></div>);

export const TAG1_TEXT = `open-source`;
export const TAG2_TEXT = `serverless`;
export const TAG3_TEXT = `markdown-supported`;

export const FONT_HEADER_TEXT = `Font Settings`;
export const FONT_SIZE_LABEL_TEXT = `Text Size`;
export const FONT_OPTIONS_LABEL_TEXT = `Font`;
export const MD_TOOLBAR_LABEL_TEXT = `Show Markdown Toolbar`;

export const SHARE_HEADER_TEXT = `Share URL`;
export const SHARE_FOOTER_TEXT = `Generated URLs can be quite long. If you like, you can use a 3rd party URL-shortening service.`;

export const PUBLISH_BTN_TEXT = `Publish`;
