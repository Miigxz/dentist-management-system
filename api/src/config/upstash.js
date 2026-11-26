import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// create a ratelimiter that allows 5 requests per 20 seconds
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "20 s"),
});

export default ratelimit;
