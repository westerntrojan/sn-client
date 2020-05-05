import React, {Component} from 'react';

import ChatClass from './ChatClass';

class ChatClassContainer extends Component {
	loading = false;

	componentDidMount(): void {
		this.loading = true;
	}

	render(): React.ReactNode {
		if (!this.loading) {
			return <ChatClass />;
		}

		return null;
	}
}

export default ChatClassContainer;
