module.exports = {
  index(request, response) {
    const pageName = request.path;
    return response.render('index', {
      pageName,
      activeHome: pageName === '/',
    });
  },
  aboutUs(request, response) {
    const pageName = '/about';

    return response.render('about', {
      pageName,
      activeAbout: pageName === '/about',
    });
  },
  portfolio(request, response) {
    const pageName = '/portfolio';

    return response.render('portfolio', {
      pageName,
      activePortfolio: pageName === '/portfolio',
    });
  },
  services(request, response) {
    const pageName = '/services';

    return response.render('services', {
      pageName,
      activeServices: pageName === '/services',
    });
  },
  teams(request, response) {
    const pageName = '/teams';

    return response.render('teams', {
      pageName,
      activeTeams: pageName === '/teams',
    });
  },
  contacts(request, response) {
    const pageName = '/contacts';

    return response.render('contacts', {
      pageName,
      activeContacts: pageName === '/contacts',
    });
  },
};
