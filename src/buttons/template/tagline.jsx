/* @flow */
/** @jsx node */

import { FUNDING, type LocaleType } from '@paypal/sdk-constants/src';
import { node, type ElementNode } from 'jsx-pragmatic/src';

import { CLASS } from '../../constants';
import { getFundingConfig } from '../../funding';
import { type ButtonStyle, type Personalization } from '../props';
import { LoadingDots } from '../../ui';

export function TagLine({ fundingSource, style, locale, multiple, nonce, personalization } :
    {| fundingSource : $Values<typeof FUNDING>, style : ButtonStyle, locale : LocaleType, multiple : boolean, nonce : string, personalization : ?Personalization |}) : ?ElementNode {

    const { label } = style;

    const fundingConfig = getFundingConfig()[fundingSource];

    if (!fundingConfig) {
        throw new Error(`Can not get config for ${ fundingSource }`);
    }

    const { Tag } = fundingConfig;

    if (!Tag) {
        return;
    }

    if (__WEB__) {
        return (
            <div class={ CLASS.TAGLINE }>
                <LoadingDots />
            </div>
        );
    }

    return (
        <div class={ CLASS.TAGLINE }>
            {
                (personalization && personalization.tagline)
                    ? <span>{ personalization.tagline.text }</span>
                    : <Tag
                        label={ label }
                        nonce={ nonce }
                        locale={ locale }
                        multiple={ multiple }
                    />
            }
        </div>
    );
}
