export let config;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  config = {
    endpoint: {
      upload: 'http://localhost:8080'
    }
  };
} else {
  config = {
    endpoint: {
      upload: 'https://us-central1-mmx-programmer.cloudfunctions.net/upload'
    }
  };
}
