import 'package:flutter/material.dart';

void main() => runApp(const LittlePatternsApp());

class LittlePatternsApp extends StatelessWidget {
  const LittlePatternsApp({super.key});
  @override
  Widget build(BuildContext context) => MaterialApp(
    title: 'Little patterns', debugShowCheckedModeBanner: false,
    theme: ThemeData(colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xff71845a), brightness: Brightness.light), scaffoldBackgroundColor: const Color(0xfff4f3ee), useMaterial3: true),
    home: const TaskHomePage(),
  );
}

class TaskItem {
  const TaskItem(this.title, this.time, {this.done = false});
  final String title;
  final String time;
  final bool done;
}

class TaskHomePage extends StatefulWidget {
  const TaskHomePage({super.key});
  @override
  State<TaskHomePage> createState() => _TaskHomePageState();
}

class _TaskHomePageState extends State<TaskHomePage> {
  final tasks = <TaskItem>[
    const TaskItem('Sketch the first screen', '9:00', done: true),
    const TaskItem('Make the button feel right', '11:30'),
    const TaskItem('Send it to a human', '15:00'),
  ];

  void toggle(int index, bool? value) => setState(() {
    final item = tasks[index];
    tasks[index] = TaskItem(item.title, item.time, done: value ?? false);
  });

  @override
  Widget build(BuildContext context) {
    final complete = tasks.where((task) => task.done).length;
    return Scaffold(
      appBar: AppBar(backgroundColor: Colors.transparent, title: const Text('✳  little patterns', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800)), actions: const [Padding(padding: EdgeInsets.only(right: 18), child: Icon(Icons.more_horiz))]),
      body: SafeArea(child: Center(child: ConstrainedBox(constraints: const BoxConstraints(maxWidth: 560), child: ListView(padding: const EdgeInsets.fromLTRB(24, 36, 24, 30), children: [
        const Text('MONDAY / YOUR OWN PACE', style: TextStyle(fontSize: 10, letterSpacing: 1.2, color: Color(0xff777970))),
        const SizedBox(height: 16), const Text('today, gently', style: TextStyle(fontSize: 38, fontWeight: FontWeight.w700, letterSpacing: -1.8)),
        const SizedBox(height: 8), Text('$complete of ${tasks.length} small things done', style: const TextStyle(color: Color(0xff777970))),
        const SizedBox(height: 22), ClipRRect(borderRadius: BorderRadius.circular(4), child: LinearProgressIndicator(value: tasks.isEmpty ? 0 : complete / tasks.length, minHeight: 5, color: const Color(0xff84955e), backgroundColor: const Color(0xffe5e5dc))),
        const SizedBox(height: 27), ...List.generate(tasks.length, (index) => TaskRow(task: tasks[index], onChanged: (value) => toggle(index, value))),
        const SizedBox(height: 25), FilledButton.icon(onPressed: () => setState(() => tasks.add(TaskItem('A small new thing', 'whenever'))), icon: const Icon(Icons.add, size: 18), label: const Text('Add one small thing'), style: FilledButton.styleFrom(backgroundColor: const Color(0xff252620), foregroundColor: Colors.white, padding: const EdgeInsets.symmetric(vertical: 15))),
        const SizedBox(height: 30), const Center(child: Text('A LITTLE ROOM TO GET THERE', style: TextStyle(fontSize: 9, letterSpacing: 1.1, color: Color(0xff96978d)))),
      ])))),
    );
  }
}

class TaskRow extends StatelessWidget {
  const TaskRow({super.key, required this.task, required this.onChanged});
  final TaskItem task;
  final ValueChanged<bool?> onChanged;
  @override
  Widget build(BuildContext context) => Container(
    margin: const EdgeInsets.only(bottom: 9), decoration: BoxDecoration(color: const Color(0xfffffefa), border: Border.all(color: const Color(0xffe5e4dc)), borderRadius: BorderRadius.circular(6)),
    child: CheckboxListTile(value: task.done, onChanged: onChanged, controlAffinity: ListTileControlAffinity.leading, activeColor: const Color(0xff738a60), title: Text(task.title, style: TextStyle(fontSize: 13, decoration: task.done ? TextDecoration.lineThrough : null, color: task.done ? const Color(0xff898a81) : const Color(0xff262721))), secondary: Text(task.time, style: const TextStyle(fontSize: 10, color: Color(0xff8c8e84))), dense: true, contentPadding: const EdgeInsets.symmetric(horizontal: 9, vertical: 4)),
  );
}
