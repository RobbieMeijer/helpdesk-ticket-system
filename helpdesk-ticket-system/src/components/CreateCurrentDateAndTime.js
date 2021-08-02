const CreateCurrentDateAndTime = {
  theDate: new Date(),

  date() {
    const year = this.theDate.getFullYear();
    const month = this.theDate.getMonth() + 1;
    const day = this.theDate.getDate();
    const thisDate = `${year}-${month}-${day}`;

    return thisDate;
  },

  time() {
    const hours = this.theDate.getHours();
    const minutes = this.theDate.getMinutes();
    const thisTime = `${hours}:${minutes}`;

    return thisTime;
  },
};

export default CreateCurrentDateAndTime;
