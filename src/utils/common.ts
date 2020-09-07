import moment from 'moment';

export const relativeDate = (date: string): string => {
	const currentDate = new Date();

	const isCurrentDay = moment(date).isoWeekday() === moment(currentDate).isoWeekday();
	const isCurrentWeek = moment(date).isoWeek() === moment(currentDate).isoWeek();

	if (isCurrentDay) {
		return new Date(date).toLocaleTimeString().slice(0, -3);
	} else if (isCurrentWeek) {
		return moment(date).format('ddd');
	} else {
		return new Date(date).toLocaleDateString();
	}
};
