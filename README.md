# @v19/totp

A simple implementation of the Time-Based One-Time Password Algorithm (TOTP) as specified in [RFC 6238](https://datatracker.ietf.org/doc/html/rfc6238).

## Usage

```typescript
import { generateSecret, generateUri } from "@v19/totp";

const secret = await generateSecret();
const uri = generateUri(secret, "user@myservice.com", "My Service");
// => otpauth://totp/My%20Service:user%40myservice.com?secret=JBSWY3DPEHPK3PXP&issuer
const code = await totp(secret);
```

