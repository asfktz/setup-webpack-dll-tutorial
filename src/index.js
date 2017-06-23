import _ from 'lodash'

import letters from './letters'
import numbers from './numbers'

const content = _.map(letters, (letter) => letter + '!').join(' ')
document.getElementById('root').innerHTML = `<h1>${content}</h1>`