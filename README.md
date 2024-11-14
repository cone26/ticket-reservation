# Ticket Reservation System Project

## Used Skills
Typescript, NestJS


## Features

## Project Strucutre

## Installation
1. Clonse this repository
```
git clone
```
2. Install dependencies
```
npm install
```
3. Execute Docker
```
docker up - d
```
4. Open the project in your borwser
```
localhost:3000
localhost:3000/api-docs // You can check the swagger document here ,check and test the API
```
* Must have an information of a concert to excute the ticket APIs, so add a concert information first!
* If you added a concert information, then now you are ready to test the ticket APIs with concert Id.

# 동시성 해결
- 티켓을 예매하는 api에 트랜잭션을 건 후 release 될 때까지 api 전체에 lock을 걸 수 있도록 개발했습니다.
- 스키마를 설계할 때, [저장 시간, 좌석 넘버] 가 동시에 같은 경우 데이터가 중복되지 않도록 유니크키를 걸었습니다.
  - 유저가 예매를 클릭할 때 동시에 여러번 클릭할 경우(따닥) 두번 저장되지 않도록 [저장 시간, 좌석 넘버, 유저 id]가 같은 경우 중복되지 않도록 유니크 키를 걸었습니다.
- Nest js에서 제공하는 bull 패키지를 사용해 redis queue를 생성했고, 티켓 예매 api를 호출하면 큐에 먼저 대기 시킨 후 서비스 로직을 탈 수 있도록 개발해 동시성 문제를 피하고자 했습니다.

- I designed an API for ticket reservation that handles concurrency by placing a lock on the entire API once a transaction begins, holding it until the release. In the database schema, I implemented a unique key constraint on [timestamp, seat number] to prevent duplicate entries for the same seat at the same time.
To prevent multiple records from being saved when a user clicks the reserve button multiple times in quick succession (double-clicking), I added an additional unique key constraint on [timestamp, seat number, user ID] to avoid duplicates under this condition.
For concurrency handling, I used the bull package provided by NestJS to create a Redis queue. When the ticket reservation API is called, the request is placed in the queue first, ensuring it only enters the service logic sequentially. This setup is designed to prevent concurrency issues effectively.
