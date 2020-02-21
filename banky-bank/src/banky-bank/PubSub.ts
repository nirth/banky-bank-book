type PubSubListener<PayloadType> = (payload: PayloadType) => void

type TopicsAndListeners<PayloadType> = {
	[topicName: string]: PubSubListener<PayloadType>[]
}

const maybeCreateTopicAndSelectIt = <PayloadType>(
	topic: string,
	topicsAndListeners: TopicsAndListeners<PayloadType>
): PubSubListener<PayloadType>[] => {
	const listeners = topicsAndListeners[topic]

	if (!Array.isArray(listeners)) {
		topicsAndListeners[topic] = []
	}

	return topicsAndListeners[topic]
}

export class PubSub<PayloadType> {
	_topicsAndListeners: TopicsAndListeners<PayloadType>

	constructor() {
		this.reset()
	}

	subscribe(topic: string, listener: PubSubListener<PayloadType>): PubSub<PayloadType> {
		const listeners: PubSubListener<PayloadType>[] = maybeCreateTopicAndSelectIt<PayloadType>(
			topic,
			this._topicsAndListeners
		)
		listeners.push(listener)

		return this
	}

	publish(topic: string, payload: PayloadType): PubSub<PayloadType> {
		const listeners: PubSubListener<PayloadType>[] = maybeCreateTopicAndSelectIt(
			topic,
			this._topicsAndListeners
		)

		listeners.forEach((listener: PubSubListener<PayloadType>) => listener(payload))

		return this
	}

	reset(): PubSub<PayloadType> {
		this._topicsAndListeners = {}
		return this
	}
}
