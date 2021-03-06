const elements = {
  badges: document.querySelector('#badges'),
  username: document.querySelector('#username'),
  text: document.querySelector('#text'),
  highlightContainer: document.querySelector('#highlight-container'),
  source: document.querySelector('#source'),
  audio: document.querySelector('#audio'),
};
const BADGES_BASE = 'https://badges.twitch.tv/v1/badges';
const EMOTE_BASE = 'https://static-cdn.jtvnw.net/emoticons/v1';
// const TTS_BASE =
//   'https://cors-anywhere.herokuapp.com/https://lazypy.ro/tts/proxy.php';
const TTS_BASE = `${window.location.origin}/tts`;
const params = new URLSearchParams(location.search);
const channel = "riekelt";
const isTTSEnabled = params.get('tts') || false;
let ttsVoice = params.get('voice') || 'Brian';
const alignBottom = params.get('bottom') || false;
const textOnScreenTime = params.get('texttimer') || 30000;
const badgeSets = {};
let messageId = '';
let cooldownTimer = null;
let msgQueue = [];

function loadBadgeSet(id) {
  Promise.all([
    fetch(`${BADGES_BASE}/global/display?language=en`).then((r) => r.json()),
    fetch(`${BADGES_BASE}/channels/${id}/display?language=en`).then((r) =>
      r.json()
    ),
  ]).then(([globalBadges, channelBadges]) => {
    if (!globalBadges) {
      return;
    }
    Object.assign(badgeSets, globalBadges.badge_sets || {});
    if (!channelBadges) {
      return;
    }
    // Merge the sets together
    Object.keys(channelBadges.badge_sets || {}).forEach((k) => {
      if (badgeSets[k].versions) {
        Object.assign(
          badgeSets[k].versions,
          channelBadges.badge_sets[k].versions
        );
      } else {
        badgeSets[k] = channelBadges.badge_sets[k];
      }
    });
  });
}

function htmlEntities(html) {
  const format = (textArr) =>
    textArr.map((n, i, arr) =>
      n.length !== 1
        ? n
        : n.replace(/[\u00A0-\u9999<>\&]/gim, (i) => `&#${i.charCodeAt(0)};`)
    );
  return Array.isArray(html) ? format(html) : format(html.split('')).join('');
}

function formatEmotes(text, emotes) {
  let splitText = text.split('');
  for (const i in emotes) {
    const e = emotes[i];
    for (let j in e) {
      let mote = e[j];
      if (typeof mote !== 'string') {
        continue;
      }
      mote = mote.split('-');
      mote = [parseInt(mote[0]), parseInt(mote[1])];
      let length = mote[1] - mote[0];
      splitText = [
        ...splitText.slice(0, mote[0]),
        // Empty
        ...Array(length + 1).fill(''),
        ...splitText.slice(mote[1] + 1, splitText.length),
      ];
      const img = new Image();
      const src = `${EMOTE_BASE}/${i}`;
      img.src = src;
      img.className = 'chat-message-emote';
      img.srcset = `${src}/1.0 1x,${src}/2.0 2x,${src}/3.0 4x`;
      splitText.splice(mote[0], 1, img.outerHTML);
    }
  }
  return htmlEntities(splitText).join('');
}

function createBadgeFromRole(name, version) {
  const badge = new Image();
  badge.className = 'chat-badge';
  if (name in badgeSets && version in badgeSets[name].versions) {
    const badgeImage = badgeSets[name].versions[version];
    const src = badgeImage.image_url_1x;
    badge.src = src;
    badge.srcset = `${src} 1x, ${badgeImage.image_url_2x} 2x, ${badgeImage.image_url_4x} 4x`;
    badge.alt = badgeImage.title;
  }
  return badge;
}

async function highlightThisMessage(user, message, extra) {
  messageId = extra.id;
  const badges = document.createElement('span');
  badges.className = 'chat-badge-items';
  // Add badges based on type
  if (extra['userBadges']) {
    Object.keys(extra['userBadges']).forEach((x) => {
      badges.appendChild(createBadgeFromRole(x, extra['userBadges'][x]));
    });
  }
  elements.badges.innerHTML = badges.innerHTML;
  elements.username.innerText = user;
  elements.username.style.color = extra.userColor;
  elements.text.innerHTML = formatEmotes(message, extra.messageEmotes);
  elements.highlightContainer.style.visibility = 'visible';
  clearTimeout(cooldownTimer);

  cooldownTimer = setTimeout(
    () => (elements.highlightContainer.style.visibility = 'hidden'),
    textOnScreenTime
  );

  if (alignBottom) {
    elements.highlightContainer.style.bottom = '0px';
  }

  if (isTTSEnabled) {
    if (typeof message != 'undefined') {
      // add message to queue
      ttsVoice = params.get('voice') || 'Brian';
      msgQueue.push(message.trim());
      playTTS();
    }
  }
}

ComfyJS.onMessageDeleted = (id, extra) => {
  if (id === messageId) {
    // DELETE THE HIGHLIGHTED MESSAGE
    elements.highlightContainer.style.visibility = 'hidden';
    elements.audio.pause();
    elements.audio.src = '';
  }
};

ComfyJS.onChat = (user, message, flags, self, extra) => {
  if (flags.highlighted) {
    highlightThisMessage(user, message, extra);
  }
  // console.log(extra.customRewardId);
  // console.log(message);

  switch (extra.customRewardId) {
    case '231bc4b1-1e68-4779-9b05-04b49cc04f822':
      ttsVoice = 'Brian';
      msgQueue.push(message.trim());
      playTTS();
      break;

    case '0ca10f38-d08c-4b8b-9c1c-0b27aa783fc0':
      ttsVoice = 'Amy';
      msgQueue.push(message.trim());
      playTTS();
      break;

    case '2dd7b2fb-004e-4186-ab40-e3e5a9d663e1':
      ttsVoice = 'Mia';
      msgQueue.push(message.trim());
      playTTS();
      break;

    case '231bc4b1-1e68-4779-9b05-04b49cc04822':
      ttsVoice = 'Takumi';
      msgQueue.push(message.trim());
      playTTS();
      break;

    case '8fa15160-d08f-4017-a952-2af919c3267b':
      ttsVoice = 'Matthew';
      msgQueue.push(message.trim());
      playTTS();
      break;

    case '975b7f18-2e1f-4209-94a6-00686b48ae41':
      ttsVoice = 'Geraint';
      msgQueue.push(message.trim());
      playTTS();
      break;

    case 'a9459135-732e-4981-9835-910ef88bd6d4':
      ttsVoice = 'Mizuki';
      msgQueue.push(message.trim());
      playTTS();
      break;

    case 'c43708cb-3a61-4834-a8a1-2e0849e319cd':
      ttsVoice = 'Maxim';
      msgQueue.push(message.trim());
      playTTS();
      break;

    case 'c6ef5b31-8983-4142-90fa-bf10b84497e0':
      ttsVoice = 'Hans';
      msgQueue.push(message.trim());
      playTTS();
      break;

    case 'd7b73cd3-f04f-4ca7-851e-9abbeaeba1de':
      ttsVoice = 'Nicole';
      msgQueue.push(message.trim());
      playTTS();
      break;
  }
};

ComfyJS.onCommand = (user, command, message, flags, extra) => {
  if (flags.highlighted) {
    highlightThisMessage(user, `!${command} ${message}`, extra);
  }
};

if (channel) {
  ComfyJS.Init(channel);

  fetch(`https://api.twitch.tv/helix/users?login=${channel}`, {
    headers: {
      'Client-ID': 'iq12do35mimd7849ghv5kijwzakyba',
    },
  })
    .then((r) => r.json())
    .then((data) => loadBadgeSet(data.data[0].id));
}

elements.audio.addEventListener('ended', () => {
  // add bit of delay between messages
  setTimeout(playTTS, 500);
});

async function playTTS() {
  if (audio.paused && msgQueue.length > 0) {
    const text = msgQueue[0];
    const voice = ttsVoice;
    const str = `voice=${voice}&text=${encodeURIComponent(text)}`;

    let speak = {};

    await fetch(`${TTS_BASE}?${str}`, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => (speak = data));

    if (!speak.success) {
      return;
    }

    // TODO: Switch to Web Audio API instead of using Audio elements.
    const mp3 = speak.speak_url;
    elements.source.src = mp3;
    const audio = elements.audio;

    audio.load();
    audio.volume = 1;
    audio.play();

    // remove message from queue
    msgQueue.shift();
  }
}
