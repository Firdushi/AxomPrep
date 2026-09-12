insert into public.categories (name_en, name_as, slug, type) values
('Assam GK','অসম সাধাৰণ জ্ঞান','assam-gk','gk'),
('General Knowledge','সাধাৰণ জ্ঞান','general-knowledge','gk'),
('General Science','সাধাৰণ বিজ্ঞান','general-science','note'),
('Mathematics','গণিত','mathematics','note'),
('Physics','পদাৰ্থ বিজ্ঞান','physics','note'),
('Current Affairs','সাম্প্ৰতিক পৰিক্ৰমা','current-affairs','current_affairs')
on conflict (slug) do nothing;

insert into public.notes (slug,title_en,title_as,excerpt_en,excerpt_as,content_en,content_as,category_id,published)
select 'assam-gk-basics','Assam GK — Quick Revision','অসম GK — দ্ৰুত পুনৰাবৃত্তি',
'High-yield Assam facts for competitive-exam revision.',
'প্ৰতিযোগিতামূলক পৰীক্ষাৰ বাবে গুৰুত্বপূৰ্ণ অসম তথ্য।',
'Use this page as a starter note. Replace it with your verified syllabus-aligned content from the admin panel.',
'এইটো এটা আৰম্ভণিৰ নোট। Admin panel-ৰ পৰা syllabus অনুসৰি যাচাই কৰা content যোগ কৰক।',
id,true from public.categories where slug='assam-gk'
on conflict (slug) do nothing;

insert into public.tests (title_en,title_as,description_en,description_as,duration_minutes,published)
values ('Assam GK Starter Mock','অসম GK আৰম্ভণি Mock','Demo test structure. Add your verified question bank.','Demo test structure. যাচাই কৰা question bank যোগ কৰক।',10,true);

insert into public.questions (question_en,question_as,options,correct_index,explanation_en,explanation_as,category_id,difficulty)
select
'Which state is the primary focus of this platform?',
'এই platform-ৰ মুখ্য focus কোনখন ৰাজ্য?',
'["Assam","Kerala","Punjab","Goa"]'::jsonb,0,
'The platform is designed especially for Assam learners.',
'এই platform-টো বিশেষকৈ অসমৰ শিক্ষাৰ্থীৰ বাবে design কৰা হৈছে।',
id,'easy'
from public.categories where slug='assam-gk';

insert into public.test_questions(test_id,question_id,position)
select t.id,q.id,1
from public.tests t cross join lateral (select id from public.questions order by created_at desc limit 1) q
where t.title_en='Assam GK Starter Mock'
on conflict do nothing;
