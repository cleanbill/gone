const display = (dateObj: any): string => {
    const date = dateObj instanceof Date ? dateObj : new Date(dateObj);
    const options = {
        dateStyle: 'full',
        timeStyle: 'short',
    };

    try {
        // @ts-ignore
        const output = new Intl.DateTimeFormat('en-GB', options).format(date);// Should use react-intl
        return output;
    } catch (er) {
        console.error('trying to display', date, er);
    }
    return '';
}

const displayShort = (dateObj: any): string => {
    const date = dateObj instanceof Date ? dateObj : new Date(dateObj);
    const options = {
        dateStyle: 'short',
        timeStyle: 'short',
    };

    try {
        // @ts-ignore
        const output = new Intl.DateTimeFormat('en-GB', options).format(date);// Should use react-intl
        return output;
    } catch (er) {
        console.error('trying to display', date, er);
    }
    return '';
}
export { display, displayShort };