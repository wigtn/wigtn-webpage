/**
 * Update: ACL 2026 / IWSLT 2026, San Diego — trip report.
 *
 * Colocated post: copy this whole folder to start a new update. Images live
 * next to the text and are imported, so a photo is never referenced by a
 * string path that can rot, and each file ships with a content hash.
 *
 * Structure follows the standard conference-recap shape: arrival → what we
 * brought → what happened on the floor → what people asked → the side
 * sessions → what we are changing → thanks. The "what changes" section is
 * deliberately a list of decisions, not a reflection: a recap that ends on
 * "it was inspiring" tells the reader nothing they can use.
 *
 * Every number here comes from the WIGVO system paper (ACL 2026 System
 * Demonstrations, pp. 336-344) and its tech report. Do not add figures that
 * are not in that source.
 *
 * Naming people: Jan Niehues, Antonios Anastasopoulos and Marcello Federico
 * are named with their roles as listed in the IWSLT 2026 proceedings. Visitor
 * photos name the company only, never the individual, and the section carries
 * an explicit no-endorsement line — conference interest is not adoption.
 *
 * Portrait photos never run as a full-width `image` block: at the 1080px media
 * breakout a 3:4 shot is 1440px tall and buries what follows. They go in a
 * gallery instead, where `aspect: "3/4"` caps a lone portrait at 460px.
 */

import type { Article, Block } from "../../data";
/* `t` comes from the leaf i18n module, never from ../../data: data.ts
 * value-imports this file, so pulling a value back out of it would form a
 * module cycle and the build would die on a TDZ error. */
import { t, type I18nText } from "../../i18n";
import arriving from "./arriving.jpg";
import boothD3 from "./booth-d3.jpg";
import coffeeBreak from "./coffee-break.jpg";
import conferencePortrait from "./conference-portrait.jpg";
import demoBoothWide from "./demo-booth-wide.jpg";
import demoExplaining from "./demo-explaining.jpg";
import demoVisitors from "./demo-visitors.jpg";
import iwsltOrganizer from "./iwslt-organizer.jpg";
import iwsltPosterPrep from "./iwslt-poster-prep.jpg";
import iwsltPosterSession from "./iwslt-poster-session.jpg";
import iwsltTalk from "./iwslt-talk.jpg";
import iwsltTalk2 from "./iwslt-talk-2.jpg";
/* The recipient's phone number is masked in this screenshot. If it is ever
 * re-exported from the app, mask it again before committing. */
import liveCall from "./live-call.png";
import midwayDeck from "./midway-deck.jpg";
import midwayReception from "./midway-reception.jpg";
import posterVisitAmazon from "./poster-visit-amazon.jpg";
import posterVisitApple from "./poster-visit-apple.jpg";
import posterVisitNvidia from "./poster-visit-nvidia.jpg";
import sessionHallway from "./session-hallway.jpg";
/* Cropped from the full-length team shot to the hero's 2:1 band — top
 * trimmed to the banner, bottom to the knee, faces intact. */
import teamCover from "./team-cover.jpg";
import venueEntrance from "./venue-entrance.jpg";
import workshopTalk from "./workshop-talk.jpg";

const p = (text: I18nText): Block => ({ t: "p", text });

/* Exported so the hero/cover can reuse the same file the body does. */
export const ACL_2026_COVER = teamCover.src;

export const acl2026SanDiego: Article = {
  slug: "acl-2026-san-diego",
  kind: "event",
  channel: "newsroom",
  newsTopic: "announcement",
  tag: "ACL 2026",
  icon: "pin",
  /* Titled as a trip report, not a product headline: the subject is the team
   * and the two venues, and "trip report" tells the reader what kind of piece
   * this is before they commit to it. */
  title: t(
        "Team WIGTN at ACL 2026 San Diego and IWSLT 2026: a trip report",
        "팀 윅튼, ACL 2026 샌디에이고 출장과 IWSLT 2026 초청 발표 회고",
      ),
  summary:
    t(
        "Six days in San Diego: a live demo booth at ACL System Demonstrations, an invited talk and poster at IWSLT, a reception on an aircraft carrier, and the deployment questions that changed what we build next.",
        "샌디에이고에서 보낸 엿새. ACL 시스템 데모 트랙 부스에서 전화를 실제로 걸어 보였고, IWSLT에서는 초청 발표와 포스터를 했습니다. 항공모함 위 리셉션도 있었지만, 무엇보다 다음에 무엇을 만들지 바꿔 놓은 질문들을 받고 왔습니다.",
      ),
  date: "2026.07.16",
  place: t(
        "San Diego, USA",
        "미국 샌디에이고",
      ),
  author: "WIGTN Research",
  readTime: t(
        "11 min",
        "11분",
      ),
  image: teamCover.src,
  externalUrl: "https://wigtn.github.io/blog/wigvo/",
  links: [
    { label: t(
        "ACL paper",
        "ACL 논문",
      ), href: "https://aclanthology.org/2026.acl-demo.33/" },
    { label: t(
        "Tech report",
        "테크 리포트",
      ), href: "https://wigtn.github.io/wigtn-tech-report/wigvo/" },
    { label: "GitHub", href: "https://github.com/wigtn/wigvo-v2" },
    { label: t(
        "Watch demo",
        "데모 영상",
      ), href: "https://youtu.be/_ixVEnHJxjk" },
  ],
  body: [
    p(
      t(
        "San Diego, July 2026. The acceptance email arrived back in April; the part that mattered came three months later, when WIGVO went to the ACL 2026 System Demonstrations floor as booth D3. Not a poster in a hallway. A working phone line, running all day, for three days. Alongside it we were invited to IWSLT 2026, the spoken-language-translation workshop, for an oral talk and a poster.",
        "2026년 7월 샌디에이고. 억셉 메일은 4월에 왔지만 진짜는 석 달 뒤였습니다. WIGVO가 ACL 2026 시스템 데모 트랙 D3 부스에 섰거든요. 복도에 붙여 놓는 포스터가 아니라, 사흘 내내 실제로 돌아가는 전화 회선이었습니다. 같은 기간에 음성 번역 워크숍인 IWSLT 2026에도 초청받아 구두 발표와 포스터를 맡았습니다.",
      ),
    ),
    p(
      t(
        "This is what we brought, what happened, and what we are changing because of it.",
        "무엇을 들고 갔고, 무슨 일이 있었고, 그래서 무엇을 바꾸기로 했는지 적습니다.",
      ),
    ),

    { t: "h", text: t(
        "Arriving",
        "도착",
      ) },
    p(
      t(
        "The 64th Annual Meeting of the Association for Computational Linguistics, July 2–7. You get a sense of the scale before you are through the door: the whole frontage of the convention centre carries the banner, and the registration queue behind it does not stop moving for two days.",
        "제64회 ACL 연례 학술대회, 7월 2일부터 7일까지. 규모는 문을 들어서기 전에 이미 짐작이 갑니다. 컨벤션 센터 정면 전체가 배너로 덮여 있고, 그 뒤 등록 줄은 이틀 내내 줄어들 기미가 없었습니다.",
      ),
    ),
    {
      t: "gallery",
      images: [
        {
          src: venueEntrance.src,
          alt: t(
        "The ACL 2026 San Diego banner across the glass frontage of the convention centre, with attendees queueing at registration inside.",
        "컨벤션 센터 유리 정면을 가로지르는 ACL 2026 샌디에이고 배너와, 안쪽 등록 데스크에 늘어선 참가자들.",
      ),
          caption: t(
        "July 2. Through the front door and into the queue.",
        "7월 2일. 정문을 지나 곧장 줄로.",
      ),
          aspect: "3/4",
        },
        {
          src: arriving.src,
          alt: "A screen inside the venue reading \"ACL 2026 San Diego, July 2-7 — Welcome to San Diego\", beside the registration desk.",
          caption: t(
        "The first thing the building says to you.",
        "건물이 건네는 첫인사.",
      ),
          aspect: "3/4",
        },
      ],
    },

    { t: "h", text: t(
        "The workshop days",
        "워크숍이 열린 이틀",
      ) },
    p(
      t(
        "The first two days are workshops and tutorials, and they are the part of ACL that does not make it into anyone's paper. You sit in a room with sixty people watching a method you have never seen, in a subfield you do not work in, and you leave with three ideas you were not looking for. It is also where you learn what everyone else is worried about this year.",
        "첫 이틀은 워크숍과 튜토리얼입니다. 논문에는 남지 않는, 그러나 ACL에서 가장 실속 있는 시간이기도 합니다. 예순 명쯤 되는 방에 앉아 내 분야도 아닌 곳의 처음 보는 방법론을 듣다 보면, 찾지도 않던 아이디어를 세 개쯤 안고 나오게 됩니다. 올해 다들 무엇을 걱정하고 있는지도 여기서 알게 되고요.",
      ),
    ),
    {
      t: "gallery",
      images: [
        {
          src: workshopTalk.src,
          alt: "A workshop talk in progress, with a pipeline diagram on the projection screen and the audience watching from the back of the room.",
          caption: t(
        "Workshop day. Someone else's pipeline, and a room taking notes.",
        "워크숍 날. 남의 파이프라인, 그리고 받아 적는 방.",
      ),
        },
        {
          src: conferencePortrait.src,
          alt: "Two attendees photographed by the official ACL 2026 conference photographer in the venue foyer.",
          caption: t(
        "Caught by the conference photographer between sessions.",
        "세션 사이, 학회 사진기사에게 붙잡힌 순간.",
      ),
        },
      ],
    },

    { t: "h", text: t(
        "What we brought",
        "무엇을 들고 갔나",
      ) },
    p(
      t(
        "WIGVO translates a phone call in both directions, in real time, over the ordinary telephone network. The constraint that shapes everything: the person on the other end installs nothing. No app, no headset, no setup. They pick up a phone the way they always have.",
        "WIGVO는 일반 전화망 위에서 통화를 양방향으로, 실시간 통역합니다. 모든 설계를 규정하는 제약은 하나입니다. 상대방은 아무것도 설치하지 않는다. 앱도, 헤드셋도, 설정도 없습니다. 늘 하던 대로 전화를 받으면 됩니다.",
      ),
    ),
    p(
      t(
        "That constraint is the whole point. The places that need translation most, the hospital front desk, the city office, the bank call center, are still running on landlines. But a phone line is a hostile environment for speech: narrowband 8 kHz audio, codec distortion, variable delay, and no way to run echo cancellation on the recipient's device. Translated speech played into the line can come back, get recognized again, and trigger a loop that translates itself. In our ungated prototype, eight of ten test calls looped until we cut them off manually.",
        "그 제약이 곧 존재 이유입니다. 통역이 가장 절실한 곳, 병원 접수창구와 구청 민원실과 은행 콜센터는 여전히 유선 전화로 돌아갑니다. 문제는 전화선이 음성에 몹시 가혹한 환경이라는 점입니다. 8kHz 협대역에 코덱 왜곡, 들쭉날쭉한 지연, 게다가 상대 단말에서 에코 제거를 돌릴 방법이 없습니다. 회선으로 내보낸 통역 음성이 되돌아와 다시 인식되면, 자기 말을 자기가 통역하는 루프에 빠집니다. 게이트를 달지 않은 초기 프로토타입에서는 열 통 중 여덟 통이 사람이 끊을 때까지 루프를 돌았습니다.",
      ),
    ),
    {
      t: "image",
      src: liveCall.src,
      alt: t(
        "The WIGVO console during a live call: the assistant panel on the left, the call in progress on the right, and an event log showing the echo gate, energy gate and voice-activity detector firing.",
        "통화 중인 WIGVO 콘솔. 왼쪽은 어시스턴트 패널, 오른쪽은 진행 중인 통화, 아래 이벤트 로그에 에코 게이트와 에너지 게이트, 음성 검출기가 차례로 찍힙니다.",
      ),
      caption:
        t(
        "The fix is unglamorous and it works: mark the window where echo is possible and inject valid silence, rather than trying to detect the echo itself. The event log on the right shows the gates opening and closing during a real call.",
        "해법은 화려하지 않지만 확실합니다. 에코를 탐지하려 들지 말고, 에코가 생길 수 있는 구간을 표시해 그동안 유효한 무음을 흘려보내는 것. 오른쪽 로그가 실제 통화에서 게이트가 열리고 닫히는 장면입니다.",
      ),
    },
    p(
      t(
        "The numbers we took to San Diego: 555 ms median latency from caller to callee, zero echo-induced loops across 147 completed field calls, and USD 0.28 per minute on the evaluated provider stack. Those come from 155 real calls over a live phone network, not a simulation.",
        "샌디에이고에 들고 간 숫자는 이렇습니다. 발신자에서 수신자 방향 지연 중앙값 555ms, 완료된 현장 통화 147건에서 에코 루프 0건, 평가에 쓴 제공자 구성 기준 분당 0.28달러. 시뮬레이션이 아니라 실제 전화망에서 건 155통에서 나온 값입니다.",
      ),
    ),

    { t: "h", text: t(
        "Three days at booth D3",
        "D3 부스에서의 사흘",
      ) },
    p(
      t(
        "The System Demonstrations track is not a poster session with a poster. You get monitors, and you are expected to run the thing. Ours showed one live call from both ends at once — the caller's side, the transcript, and the recipient's phone — while we stood next to it and explained what the gates were doing as they did it.",
        "시스템 데모 트랙은 포스터를 붙여 두는 자리가 아닙니다. 모니터를 받고, 실제로 돌리라는 요구를 받습니다. 우리 화면에는 통화 하나가 양쪽에서 동시에 떴습니다. 발신자 화면, 전사 텍스트, 수신자 휴대폰. 그 옆에 서서 게이트가 지금 무슨 일을 하는지 실시간으로 설명했습니다.",
      ),
    ),
    p(
      t(
        "Most demos ask you to watch. Ours asked you to talk. Visitors dialed a number, someone answered an ordinary phone, and the two of them held a conversation across a language barrier. Then they usually tried to break it: talking over each other, switching languages mid-sentence, walking away from the handset.",
        "대개의 데모는 보라고 합니다. 우리 데모는 말을 걸라고 했습니다. 방문자가 번호를 누르면 누군가 평범한 전화를 받았고, 두 사람은 언어의 벽을 사이에 두고 대화를 나눴습니다. 그러고 나면 대부분 부수러 들었습니다. 서로 말을 겹치고, 문장 중간에 언어를 바꾸고, 수화기에서 멀어져 보고요.",
      ),
    ),
    {
      t: "gallery",
      images: [
        {
          src: demoVisitors.src,
          alt: t(
        "Visitors gathered in front of the WIGTN demo screens at ACL 2026, watching a live translated call.",
        "ACL 2026 WIGTN 데모 화면 앞에 모여 실시간 통역 통화를 지켜보는 방문자들.",
      ),
          caption: t(
        "The screens did the explaining; we filled in the parts they could not show.",
        "설명은 화면이 했고, 우리는 화면이 못 보여주는 부분을 채웠습니다.",
      ),
        },
        {
          src: demoExplaining.src,
          alt: t(
        "A WIGTN engineer explaining the WIGVO system to visitors at the demo booth.",
        "데모 부스에서 방문자에게 WIGVO를 설명하는 WIGTN 엔지니어.",
      ),
          caption: t(
        "Most questions started with \"wait, there is no app on the other end?\"",
        "질문은 대개 여기서 시작했습니다. \"잠깐, 상대편엔 앱이 없다고요?\"",
      ),
        },
        {
          src: demoBoothWide.src,
          alt: t(
        "Wide view of the WIGTN booth showing the poster, the monitors and the demo table.",
        "포스터와 모니터, 데모 테이블이 모두 보이는 WIGTN 부스 전경.",
      ),
          caption: t(
        "Booth D3, set up and running.",
        "설치를 끝내고 돌아가기 시작한 D3 부스.",
      ),
        },
        {
          src: boothD3.src,
          alt: t(
        "The WIGTN booth at ACL 2026: the WIGVO poster on the right, three screens showing a live call in progress, and visitors talking with the team.",
        "ACL 2026 WIGTN 부스. 오른쪽에 WIGVO 포스터, 가운데 세 대의 화면에 진행 중인 통화, 그 앞에서 팀과 이야기하는 방문자들.",
      ),
          caption: t(
        "The three screens show one call from both ends at once.",
        "세 화면이 한 통화를 양쪽에서 동시에 보여줍니다.",
      ),
        },
      ],
    },
    p(
      t(
        "Running it live in a loud exhibition hall was its own test, and a harsher one than the field study. The echo gate held. The dual-session design kept each direction's interpreter from bleeding into the other. And the latency stayed low enough that people stopped treating it like a walkie-talkie and just talked.",
        "시끄러운 전시장에서 사흘을 연속 가동한 것 자체가 시험이었고, 현장 실험보다 가혹했습니다. 에코 게이트는 버텼습니다. 듀얼 세션 구조 덕에 양방향 통역이 서로 새어 들지 않았고, 지연도 충분히 낮아서 사람들이 무전기 다루듯 하기를 그만두고 그냥 대화하기 시작했습니다.",
      ),
    ),

    { t: "h", text: t(
        "Between sessions",
        "세션과 세션 사이",
      ) },
    p(
      t(
        "The coffee breaks are not a break. Twice a day the hall fills, everyone queues for the same buffet, and you end up talking to whoever is next to you in line — which at ACL means the person holding the plate beside you might be the author of a paper you cited last month. More of this trip's useful conversations started in that queue than in any scheduled session.",
        "커피 브레이크는 쉬는 시간이 아닙니다. 하루 두 번 홀이 가득 차고, 다 같은 뷔페 줄에 서고, 결국 옆 사람과 이야기하게 됩니다. ACL에서 그 말은, 옆에서 접시를 들고 있는 사람이 지난달 내가 인용한 논문의 저자일 수 있다는 뜻입니다. 이번 출장에서 쓸모 있었던 대화는 정규 세션보다 그 줄에서 더 많이 시작됐습니다.",
      ),
    ),
    {
      t: "gallery",
      images: [
        {
          src: sessionHallway.src,
          alt: t(
        "Attendees filing through the hallway under the ACL 2026 San Diego banner between sessions.",
        "세션 사이, ACL 2026 샌디에이고 배너 아래 복도를 지나가는 참가자들.",
      ),
          caption: t(
        "The corridor between rooms, every hour, on the hour.",
        "정시마다 반복되는 강의장 사이 복도.",
      ),
          aspect: "3/4",
        },
        {
          src: coffeeBreak.src,
          alt: t(
        "Attendees queueing at the ACL 2026 coffee-break buffet, with sponsor booths visible behind.",
        "뒤로 스폰서 부스가 보이는 ACL 2026 커피 브레이크 뷔페 줄.",
      ),
          caption: t(
        "The queue where half the week's conversations actually started.",
        "이번 주 대화의 절반이 실제로 시작된 줄.",
      ),
          aspect: "3/4",
        },
      ],
    },

    { t: "h", text: t(
        "The questions we did not expect",
        "예상하지 못한 질문들",
      ) },
    p(
      t(
        "We prepared for the academic questions and we got them: the evaluation protocol, why COMET against LLM references rather than human translations, how the voice-activity thresholds were tuned. Fair questions, and the paper answers them.",
        "학술적인 질문은 준비했고, 실제로 받았습니다. 평가 프로토콜, 사람 번역 대신 LLM 참조로 COMET을 잰 이유, 음성 검출 임계값을 어떻게 맞췄는지. 정당한 질문들이고 논문에 답이 있습니다.",
      ),
    ),
    p(
      t(
        "What we did not expect was how many people arrived from the other direction. Engineers from NVIDIA, Apple and Amazon came by and asked about the PSTN path, the per-minute cost at scale, whether it drops into an existing call center, and which language pairs are production-ready today. The NVIDIA speech group came back more than once, across both IWSLT and ACL, which by the third visit had turned into a proper conversation rather than a demo.",
        "예상하지 못한 건 반대편에서 온 사람이 이렇게 많다는 사실이었습니다. NVIDIA와 Apple, Amazon의 엔지니어들이 들러 PSTN 경로와 규모가 커졌을 때의 분당 비용, 기존 콜센터에 그대로 얹을 수 있는지, 지금 당장 실서비스에 쓸 수 있는 언어쌍은 어디까지인지를 물었습니다. NVIDIA 음성 팀은 IWSLT와 ACL을 오가며 여러 번 다시 찾아왔고, 세 번째쯤에는 데모라기보다 제대로 된 대화가 되어 있었습니다.",
      ),
    ),
    {
      t: "gallery",
      images: [
        {
          src: posterVisitNvidia.src,
          alt: t(
        "An engineer from NVIDIA in conversation with the WIGTN team at the poster boards.",
        "포스터 앞에서 WIGTN 팀과 이야기 중인 NVIDIA 엔지니어.",
      ),
          caption: t(
        "NVIDIA, on the third visit of the week.",
        "그 주에 세 번째로 찾아온 NVIDIA.",
      ),
          aspect: "3/4",
        },
        {
          src: posterVisitApple.src,
          alt: t(
        "An engineer from Apple looking at the WIGVO poster with a WIGTN team member.",
        "WIGTN 팀원과 함께 WIGVO 포스터를 보고 있는 Apple 엔지니어.",
      ),
          caption: t(
        "Apple, at the poster boards.",
        "포스터 앞의 Apple.",
      ),
          aspect: "3/4",
        },
        {
          src: posterVisitAmazon.src,
          alt: t(
        "Marcello Federico of Amazon, IWSLT 2026 conference chair, with three WIGTN team members at the poster boards.",
        "포스터 앞에서 WIGTN 팀원 세 명과 함께 선 IWSLT 2026 의장 마르첼로 페데리코(Amazon).",
      ),
          caption: t(
        "Marcello Federico (Amazon), IWSLT 2026 conference chair.",
        "마르첼로 페데리코(Amazon), IWSLT 2026 의장.",
      ),
          aspect: "3/4",
        },
      ],
      caption:
        t(
        "To be clear about what these photos are and are not: people stopping at a poster is interest in a research question, not adoption, evaluation or endorsement by their employers.",
        "이 사진들이 무엇이고 무엇이 아닌지는 분명히 해 둡니다. 포스터 앞에 선 것은 연구 주제에 대한 관심이지, 소속 기업의 도입이나 검토, 보증이 아닙니다.",
      ),
    },
    p(
      t(
        "None of those are paper questions. They are deployment questions, and being asked them by people who build this for a living was, frankly, the best part of the week.",
        "어느 것도 논문 질문이 아닙니다. 전부 배포에 관한 질문이고, 이걸 업으로 만드는 사람들에게서 그런 질문을 받은 것이 솔직히 그 주의 가장 좋은 부분이었습니다.",
      ),
    ),
    {
      t: "quote",
      text: t(
        "That was when it clicked: this is not just a paper. It is a product people are already waiting for.",
        "그때 분명해졌습니다. 이건 논문에 그치지 않는다. 이미 기다리는 사람이 있는 제품이다.",
      ),
    },

    { t: "h", text: t(
        "IWSLT 2026: the oral and the poster",
        "IWSLT 2026, 구두 발표와 포스터",
      ) },
    p(
      t(
        "IWSLT ran as a two-day workshop inside ACL — the 23rd International Conference on Spoken Language Translation, organised by ACL/ISCA SIGSLT. We were there twice over: an invited oral talk and a poster.",
        "IWSLT는 ACL 안에서 이틀짜리 워크숍으로 열렸습니다. ACL/ISCA SIGSLT가 주관하는 제23회 음성 번역 국제 학술대회입니다. 우리는 두 번 올랐습니다. 초청 구두 발표와 포스터.",
      ),
    ),
    {
      t: "gallery",
      images: [
        {
          src: iwsltPosterPrep.src,
          alt: t(
        "Two WIGTN team members mounting the WIGVO poster on board G44 before the IWSLT poster session.",
        "IWSLT 포스터 세션 직전, G44 보드에 WIGVO 포스터를 붙이는 WIGTN 팀원들.",
      ),
          caption: t(
        "Board G44, half an hour before the session.",
        "세션 30분 전, G44 보드.",
      ),
          aspect: "3/4",
        },
      ],
    },
    p(
      t(
        "The invited oral let us walk the architecture end to end, including the part papers usually leave out: the idea that failed. We first tried a Pearson-correlation detector comparing outgoing synthesized audio against incoming line audio. It was the cleaner idea and it did not survive the phone network, because codec quantization and variable delay destroyed the stable signal relationship it needed. It cut looping from eight calls in ten to three, then introduced false positives. We threw it away.",
        "초청 발표에서는 아키텍처를 처음부터 끝까지 짚을 수 있었습니다. 논문에서 보통 빠지는 부분, 실패한 아이디어까지 포함해서요. 처음에는 내보낸 합성 음성과 들어오는 회선 음성을 피어슨 상관으로 비교하는 검출기를 시도했습니다. 더 깔끔한 발상이었지만 전화망에서 살아남지 못했습니다. 코덱 양자화와 들쭉날쭉한 지연이 그 방식이 전제한 안정적인 신호 관계를 무너뜨렸거든요. 루프는 열 통 중 여덟에서 셋으로 줄었지만 오탐이 생겼습니다. 버렸습니다.",
      ),
    ),
    {
      t: "gallery",
      images: [
        {
          src: iwsltTalk.src,
          alt: t(
        "A WIGTN researcher presenting WIGVO at the IWSLT 2026 invited oral session in San Diego.",
        "샌디에이고 IWSLT 2026 초청 구두 세션에서 WIGVO를 발표하는 WIGTN 연구원.",
      ),
          caption: t(
        "IWSLT 2026, invited oral.",
        "IWSLT 2026 초청 구두 발표.",
      ),
          aspect: "16/9",
        },
        {
          src: iwsltTalk2.src,
          alt: t(
        "The dual-session gated relay architecture on screen during the IWSLT 2026 talk, showing the two pipelines and the three-stage echo filter between them.",
        "IWSLT 2026 발표 화면에 띄운 듀얼 세션 게이트 릴레이 구조. 두 개의 파이프라인과 그 사이의 3단 에코 필터가 보입니다.",
      ),
          caption: t(
        "The slide the questions were really about: two sessions, one gate between them.",
        "질문이 실제로 향했던 슬라이드. 세션 둘, 그 사이의 게이트 하나.",
      ),
          aspect: "16/9",
        },
      ],
      caption:
        t(
        "The room asked better questions about the detector we threw away than about the one that shipped.",
        "청중은 실제로 나간 방식보다 우리가 버린 검출기에 대해 더 좋은 질문을 했습니다.",
      ),
    },
    p(
      t(
        "The poster afterwards turned into a two-hour conversation with exactly the people who care most about real-time speech translation. Several had hit the same echo problem from different directions, which is the kind of exchange you cannot get from a paper alone.",
        "이어진 포스터 세션은 실시간 음성 번역을 가장 깊이 파는 사람들과의 두 시간짜리 대화가 됐습니다. 여러 명이 같은 에코 문제를 각자 다른 방향에서 만났더군요. 논문만으로는 얻을 수 없는 종류의 교환입니다.",
      ),
    ),
    {
      t: "gallery",
      images: [
        {
          src: iwsltPosterSession.src,
          alt: t(
        "The WIGVO poster on board G44 during the IWSLT 2026 poster session, with the team presenting.",
        "IWSLT 2026 포스터 세션, G44 보드의 WIGVO 포스터 앞에서 발표 중인 팀.",
      ),
          caption: t(
        "Two hours at G44, and we barely moved.",
        "G44에서 두 시간, 자리를 거의 뜨지 못했습니다.",
      ),
          aspect: "3/4",
        },
        {
          src: iwsltOrganizer.src,
          alt: t(
        "A WIGTN researcher with Jan Niehues of KIT in front of the ACL-IWSLT 2026 workshop signage.",
        "ACL-IWSLT 2026 워크숍 안내 앞에 선 WIGTN 연구원과 KIT의 얀 니후스.",
      ),
          caption:
            t(
        "With Jan Niehues (KIT), IWSLT 2026 organizing committee, after the session.",
        "세션이 끝난 뒤, IWSLT 2026 조직위원인 KIT의 얀 니후스와 함께.",
      ),
          aspect: "3/4",
        },
      ],
    },

    { t: "h", text: t(
        "A reception on an aircraft carrier",
        "항공모함 위에서 열린 리셉션",
      ) },
    p(
      t(
        "The social event was held on the USS Midway, the retired carrier moored on the San Diego waterfront, which the conference took over for the evening. You queue up the gangway, come out on a flight deck the length of three football pitches, and find the bar set up between the parked aircraft.",
        "친목 행사는 샌디에이고 해안에 정박한 퇴역 항공모함 USS 미드웨이에서 열렸습니다. 학회가 저녁 동안 배 전체를 빌렸더군요. 승강 통로에 줄을 서서 올라가면 축구장 세 개 길이의 비행갑판이 나오고, 세워 둔 항공기 사이에 바가 차려져 있습니다.",
      ),
    ),
    p(
      t(
        "It is a strange and very effective way to run a networking event. Nobody can hide at a table, the sun goes down over the harbour behind the island, and you spend three hours talking to people you would never have been introduced to in a session room.",
        "네트워킹 행사를 여는 방식치고는 기이하지만 대단히 효과적입니다. 테이블 뒤에 숨을 수가 없고, 함교 너머 항구로 해가 지고, 세션장에서라면 소개받을 일이 없었을 사람들과 세 시간을 이야기하게 됩니다.",
      ),
    ),
    {
      t: "gallery",
      images: [
        {
          src: midwayDeck.src,
          alt: t(
        "The entrance to the USS Midway Museum in San Diego, with the carrier's island and flags above the ticket booths.",
        "샌디에이고 USS 미드웨이 박물관 입구. 매표소 위로 함교와 신호기가 보입니다.",
      ),
          caption: t(
        "Up the gangway.",
        "승강 통로를 올라.",
      ),
        },
        {
          src: midwayReception.src,
          alt: t(
        "The conference reception on the USS Midway flight deck at sunset, with attendees gathered around the bar beside a parked aircraft.",
        "해 질 무렵 USS 미드웨이 비행갑판의 학회 리셉션. 세워 둔 항공기 옆 바에 사람들이 모여 있습니다.",
      ),
          caption: t(
        "The flight deck at sunset, with the bar parked next to an A-6.",
        "해 질 녘 비행갑판, A-6 옆에 자리 잡은 바.",
      ),
        },
      ],
    },

    { t: "h", text: t(
        "What changes because of this",
        "그래서 무엇을 바꾸나",
      ) },
    p(
      t(
        "We came back with a shorter list than we expected, but a sharper one.",
        "예상보다 짧은 목록을 들고 돌아왔습니다. 대신 훨씬 또렷합니다.",
      ),
    ),
    {
      t: "list",
      items: [
        t(
        "Session B is the bottleneck, and we now know exactly how much. Speech recognition accounts for 97.1% of the mean latency on the phone-originating path, where the median is 2,684ms against 555ms in the other direction. Optimization work goes there, not into the translation model.",
        "병목은 세션 B이고, 이제 그 크기를 정확히 압니다. 전화에서 시작하는 방향의 평균 지연 가운데 97.1%가 음성 인식이고, 중앙값은 반대 방향 555ms에 비해 2,684ms입니다. 최적화는 번역 모델이 아니라 그쪽에 들어갑니다.",
      ),
        t(
        "The P95 on that path is not acceptable for every conversation yet. We would rather say so than average it away.",
        "그 경로의 P95는 아직 모든 대화에 쓸 만한 수준이 아닙니다. 평균 뒤에 숨기느니 그대로 말하는 편을 택합니다.",
      ),
        t(
        "Language coverage is now demand-driven. We are prioritizing the pairs people actually asked for at the booth over the ones that were convenient to evaluate.",
        "언어 확장은 이제 수요를 따라갑니다. 평가하기 편한 조합보다 부스에서 실제로 요청받은 언어쌍을 먼저 붙입니다.",
      ),
        t(
        "Call-center integration came up often enough to stop treating it as a someday item.",
        "콜센터 연동은 언젠가 할 일 목록에서 빼도 될 만큼 자주 나왔습니다.",
      ),
        t(
        "The evaluation needs human judgments. COMET against offline LLM references got us through review; it will not answer the question a hospital would ask.",
        "평가에는 사람의 판단이 필요합니다. 오프라인 LLM 참조 기반 COMET으로 심사는 통과했지만, 병원이 던질 질문에는 그것으로 답할 수 없습니다.",
      ),
      ],
    },
    p(
      t(
        "The other thing we are taking home is harder to put in a list. WIGVO stops being finished when the paper is published. It is finished when someone calls a hospital in a language they do not share, and it simply works.",
        "목록에 넣기 어려운 것이 하나 더 있습니다. WIGVO는 논문이 나오면 끝나는 물건이 아닙니다. 누군가 통하지 않는 언어로 병원에 전화를 걸었는데 그냥 되는 순간, 그때 끝납니다.",
      ),
    ),

    { t: "h", text: t(
        "Thanks to",
        "고마운 분들",
      ) },
    p(
      t(
        "Antonios Anastasopoulos (George Mason University), IWSLT 2026 program chair, who extended the invitation that became the oral talk. There is an IWSLT half to this story only because of it.",
        "구두 발표로 이어진 초청을 건네주신 IWSLT 2026 프로그램 의장 안토니오스 아나스타소풀로스(조지메이슨대). 이 이야기에 IWSLT라는 절반이 생긴 것은 전적으로 그 덕분입니다.",
      ),
    ),
    p(
      t(
        "Jan Niehues (KIT) and Marcello Federico (Amazon), on the IWSLT 2026 organizing committee and in the chair respectively, for the time and the questions.",
        "IWSLT 2026 조직위원인 KIT의 얀 니후스와, 의장을 맡은 Amazon의 마르첼로 페데리코. 내주신 시간과 질문에 감사드립니다.",
      ),
    ),
    p(
      t(
        "The engineers who came back a second and third time rather than nodding politely and moving on — you know who you are, and you made the week.",
        "예의 바르게 고개만 끄덕이고 지나가는 대신 두 번, 세 번 다시 찾아와 준 엔지니어들. 누구인지 본인들이 아실 겁니다. 그 주를 만든 건 여러분입니다.",
      ),
    ),
    p(
      t(
        "And everyone who picked up the phone at booth D3 and tried to break it. The list above is mostly your doing.",
        "그리고 D3 부스에서 수화기를 들고 어떻게든 부숴 보려 한 모든 분들. 위 목록은 대부분 여러분이 만든 것입니다.",
      ),
    ),
    /* No closing team photo: the same shot now runs as the cover, and showing
     * it twice in one scroll reads as a mistake. */
    { t: "quote", text: t(
        "San Diego, you were great. Now back to shipping.",
        "샌디에이고, 좋았습니다. 이제 다시 만들러 갑니다.",
      ) },
  ],
};
