# Ticket Reservation System Project

## Used Skills
Typescript, NestJS

1. docker up - d 명령어를 통해 도커를 띄웁니다.
2. localhost:3000/api-docs으로접속하면 swagger document를 사용해서 api를 테스트해볼 수 있습니다.
3. 먼저 concert 정보를 생성합니다.
4. 생성한 concert의 id로 ticket api를 테스트할 수 있습니다.

# 동시성 해결

- 티켓을 예매하는 api에 트랜잭션을 건 후 release 될 때까지 api 전체에 lock을 걸 수 있도록 개발했습니다.
- 스키마를 설계할 때, [저장 시간, 좌석 넘버] 가 동시에 같은 경우 데이터가 중복되지 않도록 유니크키를 걸었습니다.
  - 유저가 예매를 클릭할 때 동시에 여러번 클릭할 경우(따닥) 두번 저장되지 않도록 [저장 시간, 좌석 넘버, 유저 id]가 같은 경우 중복되지 않도록 유니크 키를 걸었습니다.
- Nest js에서 제공하는 bull 패키지를 사용해 redis queue를 생성했고, 티켓 예매 api를 호출하면 큐에 먼저 대기 시킨 후 서비스 로직을 탈 수 있도록 개발해 동시성 문제를 피하고자 했습니다.
