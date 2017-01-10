import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: ['filter', 'limit', 'letter'],
  filter: '',
  letter: '',
  limit: 'all',

  limitAll: Ember.computed.equal('limit', 'all'),

  filteredList: Ember.computed('model.@each.name', 'filter', function() {

    let results = this.get('model');
    const query = this.get('filter');

    if (!!query) {
      const regexString = '(' + query.split(' ').join(')+.*(') + ')+.*';
      const regex = new RegExp(regexString, 'ig');

      results = results.filter((item) => item.get('name').match(regex));
    }

    return results.sortBy('name');
  })

});
