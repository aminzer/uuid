### Overview

Set of utilities to work with [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier)

### Installation

```
npm i @aminzer/uuid
```

### Usage example

```javascript
import uuid, { isValid } from '@aminzer/uuid';

const someUuid = uuid();
console.log(`${someUuid} is UUID: ${isValid(someUuid)}`);

const notUuid = 'abc';
console.log(`${notUuid} is UUID: ${isValid(notUuid)}`);

```

### API

> **uuid**

##### Overview

`uuid` generates random UUID string.

```javascript
import uuid from '@aminzer/uuid';

console.log(uuid());
```

##### Parameters

* `options` (`object`, optional):
    * `hyphens` (`boolean`, optional, `true` by default) - should generated string have UUID hyphen-separators or not.

##### Return value

Generated UUID string.

> **generate**

##### Overview

Named alias of default export of the module.
Following statements import the same function:

```javascript
import uuid from '@aminzer/uuid';
import { generate } from '@aminzer/uuid';
```

> **generateBytes**

##### Overview

`generateBytes` generates `Uint8Array` with UUID content.

```javascript
import { generateBytes } from '@aminzer/uuid';

console.log(generateBytes());
```

##### Return value

`Uint8Array` with generated UUID content.

> **isValid**

##### Overview

`isValid` checks if passed string has UUID format.

```javascript
import { isValid } from '@aminzer/uuid';

console.log(isValid('a2b8c6bf-f5e9-4231-8319-7d577b7f8064'));
```

##### Parameters

* `uuidString` (`string`, required) - string that need to be checked.
* `options` (`object`, optional):
    * `hyphens` (`boolean`, optional, `true` by default) - should input string have UUID hyphen-separators or not.

##### Return value

`boolean` determining if input string has UUID format or not.

> **parse**

##### Overview

`parse` converts input UUID string to UUID `Uint8Array`.

```javascript
import { parse } from '@aminzer/uuid';

console.log(parse('a2b8c6bf-f5e9-4231-8319-7d577b7f8064'));
```

##### Parameters

* `uuidString` (`string`, required) - string to be parsed.
* `options` (`object`, optional):
    * `validate` (`boolean`, optional, `true` by default) - validate input string format or not.

##### Return value

UUID `Uint8Array` parsed from input UUID string.

> **stringify**

##### Overview

`stringify` converts input UUID `Uint8Array` to UUID string.

```javascript
import { stringify, generateBytes } from '@aminzer/uuid';

const uuidBytes = generateBytes();
console.log(stringify(uuidBytes));
```

##### Parameters

* `uuidBytes` (`Uint8Array`, required) - bytes to be stringified.
* `options` (`object`, optional):
    * `validate` (`boolean`, optional, `true` by default) - validate input bytes format or not.
    * `hyphens` (`boolean`, optional, `true` by default) - add hyphens into output string or not.
    * `uppercase` (`boolean`, optional, `false` by default) - convert output string to uppercase or not.

##### Return value

UUID string stringified from input UUID `Uint8Array`.
