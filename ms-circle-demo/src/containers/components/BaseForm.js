/* @flow */

import React from 'react';

// when not specific props or state will be configured
// set them to object to avoid Flow complaints
type BaseFormProps = Object;
type BaseFormState = Object;

export class BaseForm extends React.Component {

	props: BaseFormProps;
	state: BaseFormState;

	// input event type for Flow is the SyntheticInputEvent (new as of 11/2016)
	onChange = (e: SyntheticEvent) => {

		let newState;

		if (e.target instanceof HTMLInputElement) {

			switch (e.target.type) {
				case 'number':
				case 'range':
					newState = { [e.target.name]: parseInt(e.target.value, 10) };
					break;
				case 'checkbox':
					newState = { [e.target.name]: e.target.checked };
					break;
				default: 
					newState = { [e.target.name]: e.target.value };
					break;
			}
		}

		if (e.target instanceof HTMLTextAreaElement) {
			newState = { [e.target.name]: e.target.value };
		}

		if (e.target instanceof HTMLSelectElement) {

			if (e.target.multiple) { 

				const propName: string = e.target.name;
				const optionElements = (Array.from(e.target.options): Array<any>);

				newState = { [ propName ]: optionElements
					.filter((option: HTMLOptionElement) => option.selected)
					.map((option: HTMLOptionElement) => option.value) };

			} else {
				newState = { [e.target.name]: e.target.value };
			}

		}

		this.setState(newState);
	}
}