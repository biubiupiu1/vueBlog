<template>
  <div class="article">
    <h2>{{article.title}}</h2>
    <p class="date_tag">
      {{article.date}}
      <span>{{article.label}}</span>
    </p>
    <div class="article_content" v-compiledMarkdown=article.articleContent></div>
  </div>
</template>

<script>
  import marked from 'marked';
  import highlight from 'highlight.js'

  export default {
    name: "Article",
    data () {
      return {
        article: {},
      }
    },
    created(){
    },
    mounted(){
      this.LoadArticle();
      marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        highlight: function (code) {
          return highlight.highlightAuto(code).value;
        }
      });
    },
    methods:{
      LoadArticle(){
        let id = this.$route.params.id;
        this.$http.get('/api/articleDetails/'+ id).then(
          res => {
            this.article = res.data;
          },
          res => console.log('错误'+res)
        )
      }
    },
    directives: {
      compiledMarkdown: {
        componentUpdated: function(el , binding){
          el.innerHTML = marked(binding.value);
          let aList = el.querySelectorAll('a');
          for (let i=0 , len = aList.length; i<len; i++)
            aList[i].setAttribute('target', '_blank');
        }
      },
    }
  }
</script>

<style lang="less">
@import "../assets/css/basic";
.article_content a{
  color: @active;
}
.hljs {
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  color: #383a42;
  background: #fafafa;
}

.hljs-comment,
.hljs-quote {
  color: #a0a1a7;
  font-style: italic;
}

.hljs-doctag,
.hljs-keyword,
.hljs-formula {
  color: #a626a4;
}

.hljs-section,
.hljs-name,
.hljs-selector-tag,
.hljs-deletion,
.hljs-subst {
  color: #e45649;
}

.hljs-literal {
  color: #0184bb;
}

.hljs-string,
.hljs-regexp,
.hljs-addition,
.hljs-attribute,
.hljs-meta-string {
  color: #50a14f;
}

.hljs-built_in,
.hljs-class .hljs-title {
  color: #c18401;
}

.hljs-attr,
.hljs-variable,
.hljs-template-variable,
.hljs-type,
.hljs-selector-class,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-number {
  color: #986801;
}

.hljs-symbol,
.hljs-bullet,
.hljs-link,
.hljs-meta,
.hljs-selector-id,
.hljs-title {
  color: #4078f2;
}

.hljs-emphasis {
  font-style: italic;
}

.hljs-strong {
  font-weight: bold;
}

.hljs-link {
  text-decoration: underline;
}
.article_content p img{
  max-width: 100%;
}
</style>

<style scoped>
.article{
  padding-top: 40px;
  overflow: hidden;
}
.article h2{
  font-size: 25px;
  text-align: center;
  letter-spacing: 2px;
  font-weight: 400;
}
.date_tag{
  margin-top: 40px;
  text-align: center;
  color: #999;
  letter-spacing: 1px;
  font-size: 14px;
}
.date_tag span{
  margin-left: 30px;
  border: 1px solid #ccc;
  border-radius: 3px;
  display: inline-block;
  padding: 3px 6px;
}
.article_content{
  margin-top: 30px;
  line-height: 30px;
  font-family: Roboto,Helvetica Neue,Hiragino Sans GB,LiHei Pro,Arial,serif;
  font-weight: 400;
  letter-spacing: 1px;
  word-spacing: 1px;
  font-size: 16px;
  color: #666;
  text-rendering: optimizelegibility;
}

@media screen and (max-width: 700px) {
  .date_tag{
    font-size: .7rem;
    margin-top: 1.5rem;
  }
  .article{
    padding-top: 20px;
  }
  .article h2{
    font-size: 1.2rem;
  }
}
</style>
