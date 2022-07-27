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

##### Return value

Generated UUID string.

> **generate**

##### Overview

Named alias of default export of the module.

```javascript
import { generate } from '@aminzer/uuid';

console.log(generate());
```

##### Return value

Generated UUID string.

> **generateBuffer**

##### Overview

`generateBuffer` generates `Buffer` with UUID content.

```javascript
import { generateBuffer } from '@aminzer/uuid';

console.log(generateBuffer().toString('hex'));
```

##### Return value

`Buffer` with generated UUID content.

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

`parse` converts input UUID string to UUID `Buffer`.

```javascript
import { parse } from '@aminzer/uuid';

console.log(parse('a2b8c6bf-f5e9-4231-8319-7d577b7f8064'));
```

##### Parameters

* `uuidString` (`string`, required) - string that need to parsed.
* `options` (`object`, optional):
    * `validate` (`boolean`, optional, `true` by default) - validate input string before parsing or not.

##### Return value

UUID `Buffer` parsed from input UUID string.

> **stringify**

##### Overview

`stringify` converts input UUID `Buffer` to UUID string.

```javascript
import { stringify, generateBuffer } from '@aminzer/uuid';

const uuidBuffer = generateBuffer();
console.log(stringify(uuidBuffer));
```

##### Parameters

* `uuidBuffer` (`Buffer`, required) - string that need to parsed.
* `options` (`object`, optional):
    * `validate` (`boolean`, optional, `true` by default) - validate input buffer before stringifying or not.
    * `hyphens` (`boolean`, optional, `true` by default) - add hyphens into output string or not.
    * `uppercase` (`boolean`, optional, `false` by default) - convert output string to uppercase or not.

##### Return value

UUID string stringified from input UUID `Buffer`.
