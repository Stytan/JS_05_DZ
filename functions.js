/**
 * Created by sergey.lezhenko on 13.03.2018.
 */
var out = document.getElementById('view');

function view(obj, elem) {
  if (elem === undefined) elem = 'p';
  out.insertAdjacentHTML('beforeend', '<' + elem + '>' + obj.toString() + '</' + elem + '>');
}
