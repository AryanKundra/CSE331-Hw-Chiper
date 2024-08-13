import React from 'react';
import {cipher_decode, cipher_encode, crazy_caps_decode, crazy_caps_encode, frog_latin_decode, frog_latin_encode } from './latin_ops';
import { explode, compact } from './char_list';

/** Returns UI that displays a form asking for encode/decode input. */
export const ShowForm = (_: {}): JSX.Element => {
    // TODO: Replace this with something fully functional.
    return (
        <form action="/" method="get">
          <input type="text" id="word" name="word"></input>

          <label>Algorithm:</label>
      <select name="algo">
        <option value="cipher">Cipher</option>
        <option value="crazy-caps">Crazy Caps</option>
        <option value="frog-latin">Frog Latin</option>
      </select>
      <br />

          {/* Hint: for these radio buttons to be associated with each other
              (when one is checked the other isn't) they need the same name */}
         <label>Operation:</label>
      <div>
        <input type="radio" id="encode" name="op" value="encode" defaultChecked />
        <label htmlFor="encode">Encode</label>
      </div>
      <div>
        <input type="radio" id="decode" name="op" value="decode" />
        <label htmlFor="decode">Decode</label>
      </div>
      <br />

      <button type="submit">Submit</button>
    </form>
  );
};


/** Properties expected for the ShowResult UI below. */
export type ShowResultProps = {
    readonly word: string;
    readonly algo: "cipher" | "crazy-caps" | "frog-latin";
    readonly op: "encode" | "decode";
};

/**
 * Returns UI that shows the result of applying the specified operation to the
 * given word.
 */
export const ShowResult = (props: ShowResultProps): JSX.Element => {
  props;
  if (props.algo === "cipher") {
      const result = props.op === 'encode' ? cipher_encode(explode(props.word)) : cipher_decode(explode(props.word));
      return <p><code>{compact(result)}</code></p>;
  } else if (props.algo === "crazy-caps") {
      const result = props.op === 'encode' ? crazy_caps_encode(explode(props.word)) : crazy_caps_decode(explode(props.word));
      return <p><code>{compact(result)}</code></p>;
  } else if (props.algo === "frog-latin") {
      const result = props.op === 'encode' ? frog_latin_encode(explode(props.word)) : frog_latin_decode(explode(props.word));
      return <p><code>{compact(result)}</code></p>;
  } 
  return <p><code>Hi there</code></p>;
};
