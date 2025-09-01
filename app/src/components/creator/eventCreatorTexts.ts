export interface EventCreatorTexts {
  steps: {
    [key: number]: {
      title: string;
      description: string;
    };
  };
  step1: {
    question: string;
    hint: string;
    buttons: {
      no: string;
      agree: string;
    };
  };
  step2: {
    question: string;
    hint: string;
    buttons: {
      no: string;
      agree: string;
    };
  };
  step3: {
    hint: string;
    placeholders: {
      eventName: string;
      description: string;
    };
    button: string;
  };
  step4: {
    hint: string;
    placeholders: {
      locationName: string;
      city: string;
      streetAddress: string;
      zipCode: string;
    };
    button: string;
  };
  step5: {
    hint: string;
    button: string;
  };
  step6: {
    button: string;
  };
  navigation: {
    back: string;
  };
}

export const texts: EventCreatorTexts = {
  steps: {
    1: {
      title: "Restrict Participant Additions",
      description: "If you agree, only the organizer will be able to add participants to the event list. This option is intended for events with a predefined guest list.",
    },
    2: {
      title: "Payment System Setup",
      description: "If you agree, the event will include a payment system. This option is intended for events with ticket sales or paid entry.",
    },
    3: {
      title: "Event Information",
      description: "Write the basic details of your event.",
    },
    4: {
      title: "Address Form",
      description: "Please fill in your complete address information below.",
    },
    5: {
      title: "Event Date and Time",
      description: "Enter the start date and time of the event.",
    },
    6: {
      title: "Confirmation",
      description: "Your event has been created successfully. You will now be redirected to the Event Management Panel.",
    },
  },
  step1: {
    question: "Do you want to restrict participant additions to the organizer?",
    hint: "Choose 'Agree' for private events with a fixed guest list, or 'No' for open registration.",
    buttons: {
      no: "No",
      agree: "Agree",
    },
  },
  step2: {
    question: "Do you want to include a payment system for the event?",
    hint: "Select 'Agree' if your event requires ticket sales or paid entry, otherwise choose 'No'.",
    buttons: {
      no: "No",
      agree: "Agree",
    },
  },
  step3: {
    hint: "Provide a clear event name and description to attract participants.",
    placeholders: {
      eventName: "Name event",
      description: "Description",
    },
    button: "Next",
  },
  step4: {
    hint: "Enter accurate address details for the event location.",
    placeholders: {
      locationName: "Name Location",
      city: "City",
      streetAddress: "Street address",
      zipCode: "ZIP code",
    },
    button: "Next",
  },
  step5: {
    hint: "Specify the exact date and time when your event will start.",
    button: "Next",
  },
  step6: {
    button: "Go to Management Panel",
  },
  navigation: {
    back: "Back",
  },
};