# Interview bank

Eleven questions in three `AskUserQuestion` calls. The tool takes at most four
questions per call and two to four options each, and it always adds "Other", so
every question below is answerable off-script.

Question text is Korean because it is shown to the user. The annotations under
each option say what the answer sets, and are for you.

**Skip any question Phase 0 already answered.** If the repo tells you the subject
is a release of WigtnOCR, do not ask which template. Say what you found, and ask
the rest.

---

## Round 1: Scope (4 questions, every post)

### Q1. 어떤 종류의 글인가요?
`header: "템플릿"`

| Option | Sets |
| --- | --- |
| 학회·워크숍 참가 | `conference`; `kind: "event"`, `newsTopic: "announcement"`, `icon: "pin"` |
| 해커톤·대회 | `hackathon`; `kind: "event"`, `newsTopic: "award"`, `icon: "trophy"` |
| 무언가 공개·출시·채택됨 | `announcement`; `kind: "report"`, `newsTopic: "release"`, `tag: "RELEASE"` |
| 밋업·세미나 개최 | `community`; `kind: "community"`, `newsTopic: "community"` |

### Q2. 사실의 출처는 어디입니까? (복수 선택)
`header: "출처"`, `multiSelect: true`

| Option | Then |
| --- | --- |
| `wigtn-tech-report` 레포의 해당 리포트 | Read it there. Usually the strongest source, and the post should link it rather than restate it. |
| GitHub README / 모델 카드 / npm 레지스트리 | Ask for the URL and fetch it. Never recall it. |
| 주최측 발표·보도자료 | Ask for the URL. Good for placings, dates, participant counts. |
| 내가 직접 붙여넣겠다 | Take the paste as a source and cite it as "supplied by the team". |

### Q3. 사진은 어떻게 하나요?
`header: "사진"`

| Option | Then |
| --- | --- |
| 이미 레포 안에 있다 | Inventory the other post folders yourself, then propose. `public/images/` is no longer a photo store. |
| 내가 폴더에 넣어두겠다 | Give the exact folder path, wait, then run `magick identify` on what arrives. |
| 없다 | No `image` field, no `*_COVER`. The card renders `BrandCover`, which is intended. Say so in the header. |

### Q4. 어느 피드에 올라가야 하나요?
`header: "피드"`

| Option | Sets |
| --- | --- |
| 뉴스룸에 (공지·릴리스) | `channel: "newsroom"`. Releases surface on `/notices`; a note can pair into `/story`. |
| 스토리로 (장문) | `channel: "story"`. Rendered at `/story/<slug>`, summarized by a `/story` row. |
| 백카탈로그 | Delete the `channel` field. Reachable by URL, not in any feed. |

---

## Round 2: The carrying section

Pick the bank matching Q1. This round decides whether the post's most important
section exists at all. **If the answer is "모르겠다" or "없다", cut the section**
and record why in the header.

### hackathon

**Q5. 이 빌드에서 지금도 살아 있는 게 있나요?** `header: "살아남은 것"`
- 아직 돌아가는 게 있다 → write the section; ask what, and what replaced the rest
- 다 버렸다, 그게 요점이다 → write it as a list of what was thrown away and why
- 아직 모르겠다 → **cut the section**; header records it (worked example:
  `updates/oba-weekendthon-top6`, the blog story)

**Q6. 글을 지배한 제약은 무엇이었나요?** `header: "제약"`
- 시계 (몇 시간 안에) · 필수 플랫폼/API · 팀 규모 · 심사 방식
- Whichever is picked opens section 2, and everything downstream is its consequence.

**Q7. 판이 갈릴 수 있었던 기술 판단 하나는?** `header: "그 도박"`
- 작은 모델 + 결정론적 하네스 · 특정 플랫폼 올인 · 모델 생성 대신 고정 경로 · 딱히 없었다
- "딱히 없었다" is a real answer. Cut section 4 rather than inventing a bet.

**Q8. 결과를 어떻게 적을까요?** `header: "결과"`
- 순위 + 트랙 + 주최 · 순위만 · 수상 없음 (참가기)

### conference

**Q5. 이번 참가가 바꾼 결정이 있나요?** `header: "바뀐 것"`
- 목록으로 낼 수 있다 → the section, as a list, with the evidence per item
- 하나뿐이다 → one item is fine and reads as honest
- 없다 → **cut**; a recap that ends on sentiment is what this template exists to prevent

**Q6. 무엇을 가져갔나요? (복수 선택)** `header: "가져간 것"`, `multiSelect`
- 논문 발표 · 데모/부스 · 포스터 · 참관만
- Drives section 3 and how much of the work needs restating for a reader who skipped the paper.

**Q7. 예상하지 못한 질문을 받았나요?** `header: "질문"`
- 받았다, 기억난다 · 학술적인 것뿐이었다 · 기억나는 게 없다
- The unprepared questions **are** section 5. Without them, fold it into section 4.

**Q8. 사이드 세션을 넣을까요?** `header: "사이드"`
- 우리 것이 있었다 · 남의 것만 봤다 · 넣지 않는다

### announcement

**Q5. 정확히 무엇이 공개됐나요? (복수 선택)** `header: "아티팩트"`, `multiSelect`
- 가중치 · 어댑터(LoRA 등) · 학습 데이터 · 평가 코드 · 라이선스
- This is the carrying section and the one that overclaims. "Weights" and "an
  adapter" are different claims, and confusing them has already shipped here.

**Q6. 설치·실행 방법은?** `header: "설치"`
- 단일 명령 → `quote` block
- 여러 단계 → `list` block, because a quote collapses to one line
- 설치형이 아니다 → cut the "Get it" section

**Q7. 대응하는 테크 리포트가 있나요?** `header: "리포트"`
- 있다 → link it in "Read the report"; that is where method and numbers live
- 아직 없다 → the announcement still ships, but say plainly that the write-up is
  coming rather than putting a benchmark table here instead
- 필요 없다 → fine for a package with nothing to measure

**Q8. 한 줄로 왜 중요한가요?** `header: "한 줄"`
- 성능 · 접근성(누구나 쓸 수 있게) · 비용 · 특별히 없다
- One line in the lede. Everything past one line is a finding and belongs in the
  report.

### community

**Q5. 방이 무엇을 두고 갈렸나요?** `header: "이견"`
- 기억나는 논쟁이 있다 → the section, both sides, left unresolved if it was
- 딱히 없었다 → **cut**; then ask whether the recap is worth publishing at all

**Q6. 누가 왔나요?** `header: "참석"`. 선택지: 직군 구성 · 회사 유형 · 공개하지 않음

**Q7. 발표는 어떻게 적을까요?** `header: "발표"`. 선택지: 발표자+제목+핵심 주장 · 제목만 · 발표 없이 토론만

**Q8. 다음 회차가 있나요?** `header: "다음"`. 선택지: 날짜가 잡혔다 · 미정, 신청 링크만 · 없다

---

## Round 3: Editorial (3 questions, every post)

### Q9. 사람과 회사를 어떻게 표기할까요?
`header: "표기"`

| Option | Then |
| --- | --- |
| 회사만, 개인 이름 없음 | The default. Visitor photos name the employer only. |
| 공표된 역할이 있는 사람은 명명 | Program chair, organizer, author. Spell the role the way the proceedings do. |
| 팀원은 크레딧 줄에만 | Teammates named once, in the closing credit. |

Where a photo shows someone from another company, the section carries the
explicit line that interest is not adoption or endorsement by their employer.

### Q10. 빼야 할 것이 있나요? (복수 선택)
`header: "제외"`, `multiSelect: true`

| Option | Then |
| --- | --- |
| 아직 공개 안 된 수치 | Track it and check the draft against it before Phase 6. |
| 고객·파트너 식별 정보 | Same. |
| 검증되지 않은 주장 | Same. |
| 특별히 없다 | Still apply the standing rules in `AGENTS.md`. |

Also mask anything personal that survives into a screenshot. The WIGVO console
shot in the `acl-2026-san-diego` blog post has a masked phone number,
and it has to be masked
again on any re-export.

### Q11. 커버는 무엇으로 할까요?
`header: "커버"`

| Option | Then |
| --- | --- |
| 후보를 보여주면 고르겠다 | Show the inventory with dimensions, and say what each loses at the hero's 2:1 crop. |
| 파일을 지정하겠다 | Check its crop before accepting it. |
| 커버 없이 | `BrandCover` fallback. Record the choice in the header. |

The hero crops 2:1 and the news card crops 4:3. Before proposing a cover, work
out what survives both. A portrait whose subject sits in the lower third loses
its subject.
